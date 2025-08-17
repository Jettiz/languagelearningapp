const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Vocab');
const { createTask, deleteVocab } = require('../controllers/vocabController'); 
const { findById } = require('../models/Vocab');
const { useDebugValue } = require('react');
const { expect } = chai;


// Test for Adding

describe('Add Vocab Function Test', () => {

    it('should create a new vocab word successfully', async () => {

        const req = {
            
            user: {id: new mongoose.Types.ObjectId()},
            body: { word: "New Word", meaning: "Word Meaning", example: "example in a sentence"}};

            const createdVocab = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id};

            const createStub = sinon.stub(Vocab, 'create').resolves(createdVocab);

            const res = {

                status: sinon.stub().returnsThis(),
                json: sinon.spy()

            };
            await addVocab(req, res);

            expect(createStub.calledOnceWith({userId: req.user.id, ...req.body })).to.be.true;
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(createdVocab)).to.be.true;

            createStub.restore();

        });

        it('should return 500 if an error occurs', async () => {

            const createStub = sinon.stub(Vocab, 'create').throws(new Error('DB Error'));

            const req = {
                user: { id: new mongoose.Types.ObjectId() },
                body: {word: "new word", translation: "translation", example: "example"}
            };

            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            await addVocab(req, res);

            expect(res.status.calledWith(500)).to.be.true;

            expect(res.json.calledWithMatch({message: 'DB Error'})).to.be.true;

            createStub.restore();});
        });


// Test for Updating

describe('Update Vocab Function Test', () => {

    it('should update vocab word successfully', async () => {

            const vocabId = new mongoose.Types.ObjectId();
            const existingVocab = {
                _id: vocabId,
                word: "Old Word",
                translation: "Old Translation",
                example: "Old Example",
                save: sinon.stub().resolvesThis(),
                };

            const findByIdStub = sinon.stub(Vocab, 'findById').resolves(existingVocab);

            const red = {
                params: { id: vocabId },
                body: { word: "New Word", example: "new example" }
            };

            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            await updateVocab(req, res);

            expect(existingVocab.word).to.equal("New Word");
            expect(existingVocab.exmple).to.equal("new example");;
            expect(res.status.called).to.be.false; // No error status should be set
            expect(res.json.calledOnce).to.be.true;

            findByIdStub.restore();
         });

        it('should return 500 on error', async () => {

            const findByIdStub = sinon.stub(Vocab, 'findById').throws(new Error('DB Error'));

            const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            await updateVocab(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.called).to.be.true;

            findByIdStub.restore();
        });
    });

// Test for Reading

describe('Read Vocab Function Test', () => {

    it('should return vocab words for the user', async () => {
        const userId = new mongoose.Types.ObjectId();

        const vocab = [
            { _id: new mongoose.Types.ObjectId(), word: "Word 1", userId },
            { _id: new mongoose.Types.ObjectId(), word: "Word 2", userId }
        ];

        const findStub = sinon.stub(Vocab, 'find').resolves(vocab);

        const req = { user: { id: userId } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await getVocab(req, res);

        expect(findStub.calledOnceWith({ userId })).to.be.true;
        expect(res.json.calledWith(vocab)).to.be.true;
        expect(res.status.called).to.be.false;

        findStub.restore();

    });

    it('should return 500 on error', async () => {

        const findStub = sinon.stub(Vocab, 'find').throws(new Error('DB Error'));

        const req = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await getVocab(req, res);

        expect(res.ststus.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

        findStub.restore();
    });

});

// Test for Deleting

describe('Delete Vocab Function', () => {
    it('should delete vocab successfully', async () => {

        const req = {params: { id: new mongoose.Types.ObjectId().to.String() } };

        const vocab = { remove: sinon.stub().resolves() };

        const findByIdStub = sinon.stub(Vocab, 'findById').resolkve(vocab);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteVocab(req, res);

        expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
        expect(vocab.remove.calledOnce).to.be.true;
        expect(res.json.calledWith({ message: 'Vocab deleted' })).to.be.true;

        findByIdStub.restore();
    });

    it('should return 500 if an erorr occurs', async () => {
        
        const findByIdStub = sinon.stub(Vocab, 'findById').throws(new Error('DB Error'));

        const req = { params: { id: new mongoose.Types.ObjectId().toStrong() } };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteVocab(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

        findByIdStub.restore();
    });
});