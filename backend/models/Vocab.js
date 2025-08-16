const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    word: { type: String, required: true },
    translation: { type: String },
    example: { type: String}
    confident: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);