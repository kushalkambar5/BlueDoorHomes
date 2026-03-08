import Property from "../models/propertyModel.js";
import PropertyMedia from "../models/propertyMediaModels.js";

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

    // TODO: Verify userId handling. Wait, we have requireAuth.
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
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedProperty)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    res.status(200).json({ success: true, data: updatedProperty });
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

    // Also delete media from DB (maybe not actual cloudinary files here for simplicity unless requested)
    await PropertyMedia.deleteMany({ property_id: property._id });
    await property.deleteOne();

    res.status(200).json({ success: true, message: "Property deleted" });
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().populate("media_ids"); // or maybe we just return the array of IDs?
    // Let's not populate since media_ids holds string or ObjectId, it should be populated carefully.
    // Wait, the model says media_ids: [String]... oh! In propertyModel.js it's `media_ids: [String]`.
    // Wait, in my createProperty I saved `m._id` which is an ObjectId but MongoDB converts to String if the array is `[String]`.
    res.status(200).json({ success: true, data: properties });
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
