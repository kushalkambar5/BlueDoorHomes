import Property from "../models/propertyModel";
import handleAsyncError from "../middlewares/handleAsyncError";

export const createProperty = handleAsyncError(async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateProperty = handleAsyncError(async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const deleteProperty = handleAsyncError(async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getPropertyById = handleAsyncError(async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getProperties = handleAsyncError(async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
