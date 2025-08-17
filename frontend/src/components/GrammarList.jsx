import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const GrammarPartList = ({ grammar, setGrammarPart, setEditingGrammarPart }) => {
  const { user } = useAuth();

  const handleDelete = async (grammarId) => {
    try {
      await axiosInstance.delete(`/api/grammar/${grammarId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setGrammarPart(grammar.filter((grammar) => grammar._id !== grammarId));
    } catch (error) {
      alert('Failed to delete grammar.');
    }
  };

  return (
    <div>
      {grammar.map((grammar) => (
        <div key={grammar._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{grammar.grammarPart}</h2>
          <p>{grammar.meaning}</p>
          <p className="text-sm text-gray-500">Example {grammar.example}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingGrammarPart(grammar)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(grammar._id)}
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

export default GrammarPartList;
