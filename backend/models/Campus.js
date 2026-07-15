const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // user called it Image_url but mapping to image
  established: { type: String }, // Added for UI compatibility
  students: { type: Number, default: 0 }, // Added for UI compatibility
  lat: { type: Number, default: 22.9734 }, // Default to Central India
  lng: { type: Number, default: 78.6569 },
}, { timestamps: true });

module.exports = mongoose.model('Campus', CampusSchema);
