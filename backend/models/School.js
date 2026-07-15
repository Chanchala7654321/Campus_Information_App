const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true },
  description: { type: String },
  image_url: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('School', SchoolSchema);
