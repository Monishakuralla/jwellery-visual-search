//C:\Users\hanis\jewellery-search\src\components\Login.js
import axios from 'axios';


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/admin/login', {
        email,
        password
      });
  
      const role = res.data.role;
      localStorage.setItem('role', role);
      localStorage.setItem('token', 'valid'); // Dummy token for route guarding
  
      if (role === 'admin') {
        window.location.href = '/admin';
      } else if (role === 'user') {
        window.location.href = '/search';
      } else {
        alert('Unknown role');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };
  
  

  return (
    <div className="login-container">
      <h2>Jewellery Visual Search Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
