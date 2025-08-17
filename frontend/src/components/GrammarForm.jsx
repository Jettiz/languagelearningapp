import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const GrammarPartForm = ({ grammar, setGrammarPart, editingGrammarPart, setEditingGrammarPart }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ word: '', translation: '', example: '' });

  useEffect(() => {
    if (editingGrammarPart) {
      setFormData({
        word: editingGrammarPart.word,
        translation: editingGrammarPart.translation,
        example: editingGrammarPart.example,
      });
    } else {
      setFormData({ word: '', translation: '', example: '' });
    }
  }, [editingGrammarPart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGrammarPart) {
        const response = await axiosInstance.put(`/api/grammar/${editingGrammarPart._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setGrammarPart(grammar.map((grammar) => (grammar._id === response.data._id ? response.data : grammar)));
      } else {
        const response = await axiosInstance.post('/api/grammar', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setGrammarPart([...grammar, response.data]);
      }
      setEditingGrammarPart(null);
      setFormData({ word: '', translation: '', example: '' });
    } catch (error) {
      alert('Failed to save grammar.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingGrammarPart ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
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
        {editingGrammarPart ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default GrammarPartForm;
