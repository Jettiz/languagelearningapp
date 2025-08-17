const express = require('express');
const { getGrammar, addGrammar, updateGrammar, deleteGrammar } = require('../controllers/grammarController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getGrammar).post(protect, addGrammar);
router.route('/:id').put(protect, updateGrammar).delete(protect, deleteGrammar);

module.exports = router;