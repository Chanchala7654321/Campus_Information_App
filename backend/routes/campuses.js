const express = require('express');
const router = express.Router();
const { getCampuses, getCampusById, createCampus, updateCampus, deleteCampus } = require('../controllers/campusController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', getCampuses);
router.get('/:id', getCampusById);
router.post('/', authMiddleware, adminMiddleware, createCampus);
router.put('/:id', authMiddleware, adminMiddleware, updateCampus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCampus);

module.exports = router;
