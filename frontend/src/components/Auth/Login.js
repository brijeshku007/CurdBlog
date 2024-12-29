import React, { useState } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const { data } = await login(formData);
    localStorage.setItem('token', data.token);
    navigate('/home');
    }catch(err){
      alert(`please enter vaild data `)
      navigate("/login")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8">Log in to continue your journey!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
