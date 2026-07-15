const express = require('express');
const router = express.Router();
const { getStudentsBySchool, getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/school/:school_id', getStudentsBySchool);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', authMiddleware, adminMiddleware, createStudent);
router.put('/:id', authMiddleware, adminMiddleware, updateStudent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteStudent);

module.exports = router;
