import React, { useState, useEffect } from 'react';
import './UserRequests.css';

const UserRequests = ({ profileData }) => {
  const [requests, setRequests] = useState([]); // Список всех заявок
  const [activeTab, setActiveTab] = useState('active'); // Активная вкладка
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Состояние попапа
  const [newRequestName, setNewRequestName] = useState(''); // Название новой заявки

  // Загрузка заявок при монтировании компонента
  useEffect(() => {
    fetchRequests();
  }, []);

  // Функция для загрузки заявок с сервера
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      const response = await fetch(`http://213.171.29.113:5000/requests/user/${profileData.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке заявок');
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Ошибка:', error.message);
      alert(error.message);
    }
  };

  // Функция для создания новой заявки
  const createRequest = async () => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      const response = await fetch('http://213.171.29.113:5000/requests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newRequestName }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заявки');
      }

      // Обновляем список заявок после успешного создания
      fetchRequests();
      setIsPopupOpen(false); // Закрываем попап
      setNewRequestName(''); // Очищаем поле ввода
    } catch (error) {
      console.error('Ошибка:', error.message);
      alert(error.message);
    }
  };

  // Функция для закрытия попапа при клике вне его области
  const handleClickOutside = (e) => {
    if (isPopupOpen && !e.target.closest('.popup')) {
      setIsPopupOpen(false);
    }
  };

  // Функция для закрытия попапа при нажатии клавиши Escape
  const handleKeyDown = (e) => {
    if (isPopupOpen && e.key === 'Escape') {
      setIsPopupOpen(false);
    }
  };

  // Добавляем обработчики событий при монтировании и размонтировании компонента
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen]);

  // Фильтрация заявок по активности
  const activeRequests = requests.filter((request) => request.is_active);
  const solvedRequests = requests.filter((request) => !request.is_active);

  return (
    <div className="user-requests-container">
      {/* Верхний текст и кнопка "Создать заявку" */}
      <div className="info-section">
        <p className="info-text">
          Если Вы не нашли информации об электронном компоненте в нашем сервисе, Вы можете отправить заявку на классификацию элемента нашими экспертами.
        </p>
        <button className="create-request-button" onClick={() => setIsPopupOpen(true)}>
          Создать заявку
        </button>
      </div>

      {/* Мои заявки */}
      <div className="my-requests-section">
        <h3 className="section-title">Мои заявки</h3>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Активные
          </button>
          <button
            className={`tab-button ${activeTab === 'solved' ? 'active' : ''}`}
            onClick={() => setActiveTab('solved')}
          >
            Обработанные
          </button>
        </div>

        {/* Список заявок */}
        <div className="requests-list">
          {activeTab === 'active' ? (
            activeRequests.length > 0 ? (
              activeRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <p className="request-name">{request.name}</p>
                  <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="empty-message">Нет активных заявок</p>
            )
          ) : solvedRequests.length > 0 ? (
            solvedRequests.map((request) => (
              <div key={request.id} className="request-item">
                <p className="request-name">{request.name}</p>
                <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="empty-message">Нет обработанных заявок</p>
          )}
        </div>
      </div>

      {/* Попап для создания заявки */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Создать заявку</h3>
            <input
              type="text"
              placeholder="Введите название компонента"
              value={newRequestName}
              onChange={(e) => setNewRequestName(e.target.value)}
            />
            <div className="popup-buttons">
              <button
                className="submit-button"
                onClick={createRequest}
                disabled={!newRequestName.trim()} // Кнопка неактивна, если поле пустое
              >
                Создать
              </button>
              <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequests;