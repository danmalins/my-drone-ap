import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = ({ onAuthenticate }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Тут буде логіка реєстрації
      console.log('Register:', { username, email, password });
      // Після успішної реєстрації:
      onAuthenticate();
      navigate('/home');
    };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Зареєструватися</button>
      </form>
      <p>
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default Register;