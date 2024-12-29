import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost } from '../api';

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
    await deletePost(id);
    navigate('/home');
    }catch(err){
      alert("you are not authroize user to delete this post");
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-red-600 mb-6">
          Are you sure you want to delete this post?
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
