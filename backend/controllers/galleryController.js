const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGallery = async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Gallery item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getGallery, createGallery, updateGallery, deleteGallery };
