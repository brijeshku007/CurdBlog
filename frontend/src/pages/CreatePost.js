import React, { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the title or content is empty
    if (!title || !content) {
      // Show an alert if either title or content is empty
      alert("Title and content cannot be empty!");
      return; // Do not submit the form
    }

    // If validation passes, submit the post
    try{
    await createPost({ title, content });
    navigate("/home"); // Navigate back to the home page after creating the post
    }catch(err){
      alert("your session is out please login or Signup again");
      navigate("/")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40"
            ></textarea>
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
