const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_url: { type: String },
  email: { type: String, required: true },
  dob: { type: Date },
  district: { type: String },
  state: { type: String },
  skills: { type: String },
  projects: { type: String },
  placement_info: { type: String },
  phone: { type: String },
  enrollment_date: { type: String },
  graduation_date: { type: String },
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Placed'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
