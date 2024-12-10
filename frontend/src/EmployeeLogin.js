import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/employeelogin', { username, password });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token); // Save token to local storage
      
      // Navigate to the Inventory page
      navigate('/employees');
    } catch (error) {
      setMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className='Login'>
      <h2 className='LoginTopic'>Login</h2>
      <form onSubmit={handleLogin} className='LoginForm'>
        <div>
          <label className='LoginUsername'>Username:</label>
          <input
            type="text"
            className="loginCredeintials"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Add form validation
          />
        </div><br/><br/>
        <div>
          <label className='LoginPwd'>Password:</label>
          <input
            type="password"
            className="loginCredeintials"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Add form validation
          />
        </div><br/><br/>
        <button className="loginSUbmit" type="submit">Login</button>
      </form>
      {message && <p className='loginMessage'>{message}</p>}
    </div>
  );
};

export default EmployeeLogin;