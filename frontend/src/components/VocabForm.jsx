import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const VocabForm = ({ vocab, setVocab, editingVocab, setEditingVocab }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ word: '', translation: '', example: '' });

  useEffect(() => {
    if (editingVocab) {
      setFormData({
        word: editingVocab.word,
        translation: editingVocab.translation,
        example: editingVocab.example,
      });
    } else {
      setFormData({ word: '', translation: '', example: '' });
    }
  }, [editingVocab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVocab) {
        const response = await axiosInstance.put(`/api/vocab/${editingVocab._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setVocab(vocab.map((vocab) => (vocab._id === response.data._id ? response.data : vocab)));
      } else {
        const response = await axiosInstance.post('/api/vocab', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setVocab([...vocab, response.data]);
      }
      setEditingVocab(null);
      setFormData({ word: '', translation: '', example: '' });
    } catch (error) {
      alert('Failed to save vocab.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingVocab ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Word"
        value={formData.word}
        onChange={(e) => setFormData({ ...formData, word: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Translation"
        value={formData.translation}
        onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Example"
        value={formData.example}
        onChange={(e) => setFormData({ ...formData, example: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingVocab ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default VocabForm;
