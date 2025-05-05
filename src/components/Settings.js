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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === 'password') {
      // Проверка совпадения паролей
      if (formData.newPassword !== formData.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      console.log('Новый пароль:', formData.newPassword);
    } else {
      console.log('Обновленные личные данные:', {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
      });
    }

    alert('Данные успешно сохранены!');
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
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="save-button">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default Settings;