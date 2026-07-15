const express = require('express');
const router = express.Router();
const { getGallery, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', getGallery);
router.post('/', authMiddleware, adminMiddleware, createGallery);
router.put('/:id', authMiddleware, adminMiddleware, updateGallery);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGallery);

module.exports = router;
