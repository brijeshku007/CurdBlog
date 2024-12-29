import React, { useEffect, useState } from "react";
import { updatePost, fetchPosts } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL parameters
  const [title, setTitle] = useState(""); // State for title
  const [content, setContent] = useState(""); // State for content
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // To navigate after actions

  // Fetch the post data when the component mounts
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPosts(); // Fetch all posts
        const post = data.find((item) => item._id === id); // Find the post by ID

        if (!post) {
          alert("You are not authorize user to edit this post");
          navigate("/home"); // Redirect if the post is not found
          return;
        }

        setTitle(post.title); // Set the title state
        setContent(post.content); // Set the content state
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/home");
        alert("You are not authorize user to edit  this post");
         // Redirect on error
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    getPost(); // Call the function to fetch post data
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission
    try {
      await updatePost(id, { title, content }); // Update the post with new data
      navigate("/home"); // Navigate to the home page after updating
    } catch (error) {
      console.error("Error updating post:", error);
      alert("You are not authorize user to edit this post ");
      navigate("/home")
    }
  };

  if (isLoading) {
    // Show loading spinner while data is being fetched
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-600 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title} // Bind the title state to the input
            onChange={(e) => setTitle(e.target.value)} // Update title on change
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-600 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content} // Bind the content state to the textarea
            onChange={(e) => setContent(e.target.value)} // Update content on change
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="6"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
