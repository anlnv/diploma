import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'password') {
      setShowPasswordConditions(value.trim() !== '' && !validatePassword(value));
    }

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatchError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Пароль не соответствует требованиям');
      return;
    }

    try {
      const response = await fetch('http://213.171.29.113:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.firstName,
          surname: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('Этот email уже используется другим пользователем.');
          return;
        }

        setError(data.message || 'Ошибка при регистрации');
        setSuccess('');
      } else {
        setSuccess('Регистрация прошла успешно!');
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Регистрация</h2>

        {error && <p className="register-error-message">{error}</p>}

        {success && <p className="register-success-message">{success}</p>}

        <div className="register-form-group">
          <label className="register-form-group__label" htmlFor="firstName">
            Имя
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="register-form-group__input"
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-group__label" htmlFor="lastName">
            Фамилия
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="register-form-group__input"
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-group__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-form-group__input"
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-group__label" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-form-group__input"
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-group__label" htmlFor="confirmPassword">
            Подтвердите пароль
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="register-form-group__input"
          />
        </div>

        {passwordMismatchError && (
          <p className="register-error-message">Пароли не совпадают</p>
        )}

        {showPasswordConditions && (
          <p className="password-conditions">
            Пароль должен содержать:
            <ul>
              <li>Минимум 6 символов</li>
              <li>Хотя бы одну заглавную букву</li>
              <li>Может включать цифры и спецсимволы</li>
            </ul>
          </p>
        )}

        <button type="submit" className="register-button">
          Зарегистрироваться
        </button>
      </form>
      <div className="register-login-link">
        Уже есть аккаунт?{' '}
        <a href="/login" className="register-link">
          Войти
        </a>
      </div>
    </div>
  );
};

export default Register;