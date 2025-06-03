import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const API_BASE_URL = 'http://213.171.29.113:5000';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const body = new URLSearchParams({ username, password }).toString();

      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Неверное имя пользователя или пароль');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);

      onLoginSuccess(data.token);

      navigate('/catalog');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Вход</h2>
        <div className="login-input-group">
          <label className="login-label">Email:</label>
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label className="login-label">Пароль:</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
      <p className="login-footer">
        Нет аккаунта?{' '}
        <span className="login-link" onClick={() => navigate('/register')}>
          Зарегистрироваться
        </span>
      </p>
    </div>
  );
}

export default Login;