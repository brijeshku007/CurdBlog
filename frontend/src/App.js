import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DeletePost from "./pages/DeletePost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/delete/:id" element={<DeletePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
