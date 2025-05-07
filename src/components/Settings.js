import React, { useState, useEffect } from 'react';
import './settings.css';

const Settings = ({ profileData }) => {
  // Инициализация состояния формы данными из profileData
  const [formData, setFormData] = useState({
    name: profileData?.name || '',
    surname: profileData?.surname || '',
    email: profileData?.email || '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('personal'); // Переключение между вкладками
  const [showNewPassword, setShowNewPassword] = useState(false); // Флаг для показа/скрытия нового пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Флаг для показа/скрытия подтверждения пароля
  const [passwordMismatchError, setPasswordMismatchError] = useState(false); // Ошибка несовпадения паролей
  const [showPasswordConditions, setShowPasswordConditions] = useState(false); // Флаг для отображения условий пароля

  // Обновление состояния формы при изменении profileData
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: profileData?.name || '',
      surname: profileData?.surname || '',
      email: profileData?.email || '',
    }));
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Если поле связано с паролем, проверяем его валидность
    if (name === 'newPassword') {
      validatePassword(value);
      setShowPasswordConditions(value.trim() !== '' && !validatePassword(value)); // Показываем условия, если пароль не пустой и невалидный
    }

    // Сбрасываем ошибку несовпадения паролей при изменении любого из полей пароля
    if (name === 'newPassword' || name === 'confirmPassword') {
      setPasswordMismatchError(false);
    }
  };

  // Функция для проверки валидности пароля
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/; // Минимум 6 символов, хотя бы одна заглавная буква
    return passwordRegex.test(password);
  };

  // Функция для проверки, были ли внесены изменения
  const hasChanges = () => {
    if (activeTab === 'password') {
      return formData.newPassword.trim() !== '' || formData.confirmPassword.trim() !== '';
    }
    return (
      formData.name !== profileData?.name ||
      formData.surname !== profileData?.surname ||
      formData.email !== profileData?.email
    );
  };

  // Функция для проверки совпадения паролей
  const passwordsMatch = () => {
    return formData.newPassword === formData.confirmPassword;
  };

  // Функция для проверки активности кнопки
  const isButtonDisabled = () => {
    if (activeTab === 'password') {
      return !hasChanges() || !passwordsMatch() || !validatePassword(formData.newPassword); // Кнопка отключена, если пароли не совпадают или пароль невалиден
    }
    return !hasChanges();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage

      if (activeTab === 'password') {
        // Проверка совпадения паролей
        if (!passwordsMatch()) {
          setPasswordMismatchError(true); // Устанавливаем флаг ошибки несовпадения паролей
          return;
        }

        // Запрос на смену пароля
        const passwordResponse = await fetch('http://213.171.29.113:5000/user/change-password', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_password: formData.newPassword,
          }),
        });

        if (!passwordResponse.ok) {
          const errorData = await passwordResponse.json();
          throw new Error(errorData.message || 'Ошибка при смене пароля');
        }

        // Очищаем поля формы после успешной смены пароля
        setFormData((prevData) => ({
          ...prevData,
          newPassword: '',
          confirmPassword: '',
        }));

        alert('Пароль успешно изменен!');
      } else {
        // Запрос на изменение личных данных
        const infoResponse = await fetch('http://213.171.29.113:5000/user/change-info', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name || '', // Если поле пустое, отправляем пустую строку
            surname: formData.surname || '',
            email: formData.email || '',
          }),
        });

        if (!infoResponse.ok) {
          const errorData = await infoResponse.json();
          throw new Error(errorData.message || 'Ошибка при обновлении данных');
        }

        const updatedProfile = await infoResponse.json();

        // Обновляем токен в localStorage
        const newToken = updatedProfile.token;
        if (newToken) {
          localStorage.setItem('token', newToken);
        }

        alert('Данные успешно обновлены!');
      }
    } catch (err) {
      console.error('Ошибка:', err.message);
      alert(err.message);
    }
  };

  return (
    <div className="settings-container">
      {/* Вкладки */}
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Личные данные
        </button>
        <button
          className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Изменение пароля
        </button>
      </div>

      {/* Форма */}
      <form className="settings-form" onSubmit={handleSubmit}>
        {activeTab === 'personal' && (
          <>
            <div className="form-group">
              <label htmlFor="firstName">Имя</label>
              <input
                type="text"
                id="firstName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Фамилия</label>
              <input
                type="text"
                id="lastName"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {activeTab === 'password' && (
          <>
            <div className="form-group">
              <label htmlFor="newPassword">Новый пароль</label>
              <div className="password-input-container">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {passwordMismatchError && (
              <p className="error-message">Пароли не совпадают</p>
            )}
          </>
        )}

        <button
          type="submit"
          className="save-button"
          disabled={isButtonDisabled()}
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default Settings;