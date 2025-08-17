import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import GrammarForm from '../components/GrammarForm';
import GrammarList from '../components/GrammarList';
import { useAuth } from '../context/AuthContext';

const Vocab = () => {
  const { user } = useAuth();
  const [grammar, setGrammar] = useState([]);
  const [editingGrammar, setEditingGrammar] = useState(null);

  useEffect(() => {
    const fetchGrammar = async () => {
      try {
        const response = await axiosInstance.get('/api/grammar', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setGrammar(response.data);
      } catch (error) {
        alert('Failed to fetch grammar.');
      }
    };

    fetchGrammar();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <GrammarForm
        grammar={grammar}
        setGrammar={setGrammar}
        editingGramamar={editingGrammar}
        setEditingVocab={setEditingGrammar}
      />
      <GrammarList grammar={grammar} setGrammar={setGrammar} setEditingGrammar={setEditingGrammar} />
    </div>
  );
};

export default Vocab;
