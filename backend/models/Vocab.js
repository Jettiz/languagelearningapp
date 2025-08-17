const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    word: { type: String, required: true },
    translation: { type: String },
    example: { type: String}
});

module.exports = mongoose.model('Vocab', vocabSchema);