import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const VocabList = ({ vocab, setVocab, setEditingVocab }) => {
  const { user } = useAuth();

  const handleDelete = async (vocabId) => {
    try {
      await axiosInstance.delete(`/api/vocab/${vocabId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVocab(vocab.filter((vocab) => vocab._id !== vocabId));
    } catch (error) {
      alert('Failed to delete vocab.');
    }
  };

  return (
    <div>
      {vocab.map((vocab) => (
        <div key={vocab._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{vocab.word}</h2>
          <p>{vocab.translation}</p>
          <p className="text-sm text-gray-500">Example {vocab.example}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingVocab(vocab)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(vocab._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VocabList;
