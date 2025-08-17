const express = require('express');
const { getVocab, addVocab, updateVocab, deleteVocab } = require('../controllers/vocabController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getVocab).post(protect, addVocab);
router.route('/:id').put(protect, updateVocab).delete(protect, deleteVocab);

module.exports = router;