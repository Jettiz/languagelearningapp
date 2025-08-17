const Grammar = require('../models/Grammar');
const jwt = require('jsonwebtoken');

// Read Grammar Card
 

const getGrammar = async (req, res)=> {
    
try {
    
const grammar = await GrammarParts.find({ userId: req.user.id});

res.json(grammar);

} catch (error) {

res.status(500).json({message: error.message});}}

// Create Grammar Card

const addGrammar = async (req, res) => {
    const { grammarPart, meaning, example } = req.body;
    try {
        const grammar = await Grammar.create({ userId: req.user.id, grammarPart, meaning, example });
        res.status(201).json(grammar);
        } catch (error) {
    res.status(500).json({ message: error.message });
}
};


// Update Grammar Card

const updateGrammar = async ( req, res) => {
const { grammarPart, meaning, example } = req.body;
try {
    const grammar = await Grammar.findById(req.params.id);
    if (!grammar) return res.status(404).json({ message: 'Grammar not found' });

    grammar.grammarPart = grammarPart || grammar.grammarPart;
    grammar.meaning = meaning || grammar.meaning;
    grammar.example = example || grammar.example;

    const updatedGrammar = await grammar.save();
res.json(updatedGrammar);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// Delete Grammar Card

const deleteGrammar = async (req, res) => {
try {
const grammar = await Grammar.findById(req.params.id);
if (!Grammar) return res.status(404).json({ message: 'Grammar not found' });

await grammar.remove();
res.json({ message: 'Grammar deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};

module.exports = {getGrammar, addGrammar, updateGrammar, deleteGrammar };