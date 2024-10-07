import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Theory from './pages/Theory';
import Quiz from './pages/Quiz';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkAuthStatus = () => {
  const authStatus = localStorage.getItem('isAuthenticated');
  setIsAuthenticated(authStatus === 'true');
  setIsLoading(false);
};

checkAuthStatus();
}, []);

const handleAuthentication = (status) => {
  setIsAuthenticated(status);
  localStorage.setItem('isAuthenticated', status);
};

const RedirectHandler = () => {
  const location = useLocation();
  
  if (isAuthenticated) {
    // Якщо користувач аутентифікований, залишаємо його на поточній сторінці
    return null;
  } else {
    // Якщо користувач не аутентифікований, перенаправляємо на логін,
    // зберігаючи поточний шлях для подальшого перенаправлення
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
};

if (isLoading) {
  return <div>Завантаження...</div>; // або будь-який інший компонент завантаження
}

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Тренажер оператора БПЛА</h1>
        </header>
        <Navigation />
        <main className="app-main">
          <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register onAuthenticate={() => handleAuthentication(true)} />
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onAuthenticate={() => handleAuthentication(true)} />
          } />
          
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/simulator" element={<Simulator />} />
          </Route>
          <Route path="*" element={<RedirectHandler />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Тренажер оператора БПЛА. Всі права захищені.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;