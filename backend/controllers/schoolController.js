const School = require('../models/School');

const getSchoolsByCampus = async (req, res) => {
  try {
    const schools = await School.find({ campus_id: req.params.campus_id });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ error: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSchool = async (req, res) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!school) return res.status(404).json({ error: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ error: 'School not found' });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSchoolsByCampus, getAllSchools, getSchoolById, createSchool, updateSchool, deleteSchool };
