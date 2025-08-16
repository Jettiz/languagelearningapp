import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import VocabForm from '../components/VocabForm';
import VocabList from '../components/VocabList';
import { useAuth } from '../context/AuthContext';

const Vocab = () => {
  const { user } = useAuth();
  const [vocab, setVocab] = useState([]);
  const [editingVocab, setEditingVocab] = useState(null);

  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const response = await axiosInstance.get('/api/vocab', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setVocab(response.data);
      } catch (error) {
        alert('Failed to fetch vocab.');
      }
    };

    fetchVocab();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <VocabForm
        vocab={vocab}
        setVocab={setVocab}
        editingVocab={editingVocab}
        setEditingVocab={setEditingVocab}
      />
      <VocabList vocab={vocab} setVocab={setVocab} setEditingVocab={setEditingVocab} />
    </div>
  );
};

export default Vocab;
