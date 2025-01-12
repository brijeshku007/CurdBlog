import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for the token in localStorage

    if (!token) {
      // If token is missing, redirect to the login page
      setIsAuthenticated(false);
      return;
    }

    const getPosts = async () => {
      try {
        const { data } = await fetchPosts(); // Fetch posts if token is valid
        setPosts(data);
      } catch (error) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login page
      }
    };

    getPosts();
  }, [navigate]);

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Posts</h1>
        <Logout />
        <div className="text-right mb-6">
          <Link
            to="/create"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Post
          </Link>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <li key={post._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/edit/${post._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete/${post._id}`}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
