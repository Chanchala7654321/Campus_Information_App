const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  category: { type: String, default: 'General' },
  campus_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
