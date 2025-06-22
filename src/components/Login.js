import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost/pausedesk-backend/login.php', {
        email,
        password
      });

      const data = res.data;

      if (data.status === 'success') {
        sessionStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'faculty') {
          navigate('/faculty');
        } else if (data.user.role === 'hod') {
          navigate('/hod');
        } else {
          alert('Unknown role!');
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>PauseDesk Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
