import Property from "../models/propertyModel.js";
import PropertyMedia from "../models/propertyMediaModels.js";
import cloudinary from "../config/cloudinary.js";

export const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      price_per_sqft,
      area_sqft,
      location,
      property_type,
      status,
      tags,
      brochure_url,
      media,
    } = req.body;

    const newProperty = new Property({
      title,
      description,
      price,
      price_per_sqft,
      area_sqft,
      location,
      property_type,
      status,
      tags,
      brochure_url,
      created_by: req.auth ? req.auth.userId : null,
    });

    await newProperty.save();

    let mediaIds = [];
    if (media && media.length > 0) {
      const propertyMediaDocs = media.map((m, index) => ({
        property_id: newProperty._id,
        type: m.type,
        url: m.url,
        public_id: m.public_id,
        is_primary: index === 0,
        order: index,
      }));
      const insertedMedia = await PropertyMedia.insertMany(propertyMediaDocs);
      mediaIds = insertedMedia.map((m) => m._id);
      newProperty.media_ids = mediaIds;
      await newProperty.save();
    }

    res.status(201).json({ success: true, data: newProperty });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const { media, ...updateData } = req.body;

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Update basic fields
    Object.assign(property, updateData);

    // Handle new media if provided
    if (media && media.length > 0) {
      // Filter out existing media (those with _id) to only process new ones
      const newMedia = media.filter((m) => !m._id);
      
      if (newMedia.length > 0) {
        const propertyMediaDocs = newMedia.map((m, index) => ({
          property_id: property._id,
          type: m.type,
          url: m.url,
          public_id: m.public_id,
          is_primary: property.media_ids.length === 0 && index === 0,
          order: property.media_ids.length + index,
        }));
        
        const insertedMedia = await PropertyMedia.insertMany(propertyMediaDocs);
        const newMediaIds = insertedMedia.map((m) => m._id.toString());
        property.media_ids = [...property.media_ids, ...newMediaIds];
      }
    }

    await property.save();
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    // Delete media from Cloudinary
    const mediaList = await PropertyMedia.find({ property_id: property._id });
    for (const m of mediaList) {
      try {
        await cloudinary.uploader.destroy(m.public_id);
      } catch (err) {
        console.error(`Failed to delete cloudinary asset: ${m.public_id}`, err);
      }
    }

    // Delete media from DB
    await PropertyMedia.deleteMany({ property_id: property._id });
    await property.deleteOne();

    res.status(200).json({ success: true, message: "Property deleted" });
  } catch (error) {
    next(error);
  }
};

export const deletePropertyMedia = async (req, res, next) => {
  try {
    const { propertyId, mediaId } = req.params;

    const media = await PropertyMedia.findById(mediaId);
    if (!media) {
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    }

    // 1. Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(media.public_id);
    } catch (err) {
      console.error(`Failed to delete cloudinary asset: ${media.public_id}`, err);
    }

    // 2. Remove from Property media_ids array
    await Property.findByIdAndUpdate(propertyId, {
      $pull: { media_ids: mediaId },
    });

    // 3. Delete from PropertyMedia collection
    await media.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate("media_ids");
    // Since media_ids is [String] but contains ObjectIds, we might need to be careful.
    // However, Mongoose populate works if the ref is defined, but here it's [String].
    // Let's check the property model again. It is media_ids: [String].
    // If it's [String], populate won't work unless we change the model.
    // For now, let's manually fetch media if populate fails or do it per property.
    
    // Actually, let's just fetch all and then attach media list if needed, 
    // or better, find properties and for each find its media.
    const propertiesWithMedia = await Promise.all(
      properties.map(async (p) => {
        const mediaList = await PropertyMedia.find({ property_id: p._id });
        return { ...p.toObject(), mediaList };
      }),
    );

    res.status(200).json({ success: true, data: propertiesWithMedia });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    const mediaList = await PropertyMedia.find({ property_id: property._id });
    const propertyData = { ...property.toObject(), mediaList };

    res.status(200).json({ success: true, data: propertyData });
  } catch (error) {
    next(error);
  }
};

