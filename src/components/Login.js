/*import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // Для отображения ошибок
  const [success, setSuccess] = useState(''); // Для отображения успешного сообщения

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const body = new URLSearchParams({ username, password }).toString();
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' ,
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      onLoginSuccess(data.token);

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

      const data = await response.json();

      if (!response.ok) {
        // Если сервер вернул ошибку
        setError(data.message || 'Неверное имя пользователя или пароль');
        setSuccess('');
      } else {
        // Если авторизация успешна
        const { token, token_type } = data;

        // Сохраняем токен в localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('token_type', token_type);

        setSuccess('Авторизация прошла успешно!');
        setError('');
        setFormData({
          username: '',
          password: '',
        });

        // Переадресация на главную страницу или другую страницу после авторизации
        window.location.href = '/'; // Замените '/' на нужный маршрут
      }
    } catch (err) {
      // Обработка сетевых ошибок
      setError('Ошибка соединения с сервером');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Вход</h2>

     
        {error && <p className="error-message">{error}</p>}

        
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
      <div className="register-link">
        Нет аккаунта?{' '}
        <a href="/register" className="link">
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};

export default Login;*/

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
      // Формируем тело запроса
      const body = new URLSearchParams({ username, password }).toString();

      // Отправляем POST-запрос на сервер
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      // Проверяем статус ответа
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Неверное имя пользователя или пароль');
      }

      // Получаем данные из ответа
      const data = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem('token', data.token);

      // Вызываем колбэк успешной авторизации
      onLoginSuccess(data.token);

      // Переадресуем пользователя на главную страницу
      navigate('/catalog');
    } catch (error) {
      // Обработка ошибок
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Вход</h2>
        <div className="login-input-group">
          <label className="login-label">Имя пользователя:</label>
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