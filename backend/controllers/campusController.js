const Campus = require('../models/Campus');
const School = require('../models/School');
const Student = require('../models/Student');

const getCampuses = async (req, res) => {
  try {
    const campuses = await Campus.find().lean();
    
    for (let campus of campuses) {
      const schools = await School.find({ 
        campus_id: { $in: [campus._id, campus._id.toString()] } 
      }).select('_id');
      const schoolIds = schools.map(s => s._id);
      
      // Count students where school_id matches any of the schoolIds
      // We use $in with both ObjectIds and their string representations for robustness
      const studentCount = await Student.countDocuments({ 
        school_id: { $in: [...schoolIds, ...schoolIds.map(id => id.toString())] } 
      });
      
      campus.students = studentCount;
    }

    res.json(campuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findById(req.params.id).lean();
    if (!campus) return res.status(404).json({ error: 'Campus not found' });
    
    const schools = await School.find({ 
      campus_id: { $in: [campus._id, campus._id.toString()] } 
    }).select('_id');
    const schoolIds = schools.map(s => s._id);
    const studentCount = await Student.countDocuments({ 
      school_id: { $in: [...schoolIds, ...schoolIds.map(id => id.toString())] } 
    });
    
    res.json({ ...campus, students: studentCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCampus = async (req, res) => {
  try {
    const campus = new Campus(req.body);
    await campus.save();
    res.status(201).json(campus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCampus = async (req, res) => {
  try {
    const campus = await Campus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!campus) return res.status(404).json({ error: 'Campus not found' });
    res.json(campus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByIdAndDelete(req.params.id);
    if (!campus) return res.status(404).json({ error: 'Campus not found' });
    res.json({ message: 'Campus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCampuses, getCampusById, createCampus, updateCampus, deleteCampus };
