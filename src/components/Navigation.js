import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Головна</Link></li>
        <li><Link to="/theory">Теорія</Link></li>
        <li><Link to="/quiz">Тест</Link></li>
        <li><Link to="/simulator">Симулятор</Link></li>
        <li>onClick={handleLogout}</li>
      </ul>
    </nav>
  );
};

export default Navigation;