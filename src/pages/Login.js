import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onAuthenticate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Тут буде логіка авторизації
      console.log('Login:', { email, password });
      // Після успішної авторизації:
      onAuthenticate(true);
      navigate('/home');
      

      const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get('redirect') || '/';
    
    navigate(redirectPath);
    };

  return (
    <div className="auth-container">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      <p>
        Немає акаунту? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default Login;