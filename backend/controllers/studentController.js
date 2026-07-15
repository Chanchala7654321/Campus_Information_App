const Student = require('../models/Student');

const getStudentsBySchool = async (req, res) => {
  try {
    const filter = { school_id: req.params.school_id };
    if (req.query.status && req.query.status !== 'All') {
      filter.status = req.query.status;
    }
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.schoolId) {
      filter.school_id = req.query.schoolId;
    }
    if (req.query.status && req.query.status !== 'All') {
      filter.status = req.query.status;
    }
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStudentsBySchool, getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
