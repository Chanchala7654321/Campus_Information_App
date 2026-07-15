const express = require('express');
const router = express.Router();
const { getSchoolsByCampus, getAllSchools, getSchoolById, createSchool, updateSchool, deleteSchool } = require('../controllers/schoolController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/campus/:campus_id', getSchoolsByCampus);
router.get('/', getAllSchools);
router.get('/:id', getSchoolById);
router.post('/', authMiddleware, adminMiddleware, createSchool);
router.put('/:id', authMiddleware, adminMiddleware, updateSchool);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSchool);

module.exports = router;
