import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
