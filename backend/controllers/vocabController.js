const Vocab = require('../models/Vocab');
const jwt = require('jsonwebtoken');

// Read Vocab Card


const getVocab = async (req, res) => {

try {

const vocab = await Vocab.find({ userId: req.user.id });

res.json(vocab);

} catch (error) {
    
res.status(500).json({ message: error.message });}};

// Create Vocab Card

const addVocab = async (req, res) => {
    const { word, translation, example } = req.body;
    try {
        const vocab = await Vocab.create({ userId: req.user.id, word, translation, example });
        res.status(201).json(vocab);
        } catch (error) {
    res.status(500).json({ message: error.message });
}
};


// Update Vocab Card

const updateVocab = async ( req, res) => {
const { word, translation, example } = req.body;
try {
    const vocab = await Vocab.findById(req.params.id);
    if (!vocab) return res.status(404).json({ message: 'Vocab not found' });

    vocab.word = word || vocab.word;
    vocab.translation = translation || vocab.translation;
    vocab.example = example || vocab.example;

    const updatedVocab = await vocab.save();
res.json(updatedVocab);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// Delete Vocab Card

const deleteVocab = async (req, res) => {
try {
const vocab = await Vocab.findById(req.params.id);
if (!Vocab) return res.status(404).json({ message: 'Vocab not found' });

await vocab.remove();
res.json({ message: 'Vocab deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};

module.exports = { getVocab, addVocab, updateVocab, deleteVocab };