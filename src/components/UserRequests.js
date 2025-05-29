/*import React, { useState, useEffect } from 'react';
import './UserRequests.css';

const UserRequests = ({ profileData }) => {
  const [requests, setRequests] = useState([]); // Список всех заявок
  const [processingTab, setProcessingTab] = useState('expert'); // Вкладка обработки: 'expert' или 'ai'
  const [activeTab, setActiveTab] = useState('active'); // Вкладка заявок: 'active' или 'solved'
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

  // Фильтрация заявок по активности
  const activeRequests = requests.filter((request) => request.is_active);
  const solvedRequests = requests.filter((request) => !request.is_active);

  return (
    <div className="user-requests-container">
      <div className="processing-tabs">
        <button
          className={`processing-tab-button ${processingTab === 'expert' ? 'active' : ''}`}
          onClick={() => setProcessingTab('expert')}
        >
          Экспертная классификация
        </button>
        <button
          className={`processing-tab-button ${processingTab === 'ai' ? 'active' : ''}`}
          onClick={() => setProcessingTab('ai')}
        >
          AI-классификация
        </button>
      </div>

      <div className="processing-content">
        {processingTab === 'expert' ? (
          <>
            <div className="info-section">
              <p className="info-text">
                Если Вы не нашли информации об электронном компоненте в нашем сервисе, Вы можете отправить
                заявку на классификацию элемента нашими экспертами.
              </p>
              <button className="create-request-button" onClick={() => setIsPopupOpen(true)}>
                Создать заявку
              </button>
            </div>

            <div className="request-tabs">
              <button
                className={`request-tab-button ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Активные заявки
              </button>
              <button
                className={`request-tab-button ${activeTab === 'solved' ? 'active' : ''}`}
                onClick={() => setActiveTab('solved')}
              >
                Обработанные заявки
              </button>
            </div>

            <div className="requests-list">
              {activeTab === 'active' ? (
                activeRequests.length > 0 ? (
                  activeRequests.map((request) => (
                    <div key={request.id} className="request-item__user">
                      <p className="request-name">{request.name}</p>
                      <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">Нет активных заявок</p>
                )
              ) : solvedRequests.length > 0 ? (
                solvedRequests.map((request) => (
                  <div key={request.id} className="request-item__user">
                    <p className="request-name">{request.name}</p>
                    <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message">Нет обработанных заявок</p>
              )}
            </div>
          </>
        ) : (
          // Вкладка AI-классификация
          <div className="ai-classification-section">
            <p className="ai-classification-text">
              Здесь вы можете в режиме реального времени классифицировать элемент с помощью искусственного
              интеллекта.
            </p>
            <button className="ai-classification-button">Классифицировать с ИИ</button>
          </div>
        )}
      </div>

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
            <div className="popup-buttons__user">
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

export default UserRequests;*/
import React, { useState, useEffect } from 'react';
import './UserRequests.css';

const UserRequests = ({ profileData }) => {
  const [requests, setRequests] = useState([]); // Список всех заявок
  const [processingTab, setProcessingTab] = useState('expert'); // Вкладка обработки: 'expert' или 'ai'
  const [activeTab, setActiveTab] = useState('active'); // Вкладка заявок: 'active' или 'solved'
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Состояние попапа
  const [newRequestName, setNewRequestName] = useState(''); // Название новой заявки

  // Состояния для AI-классификации
  const [aiInput, setAiInput] = useState(''); // Ввод названия элемента для ИИ
  const [isLoading, setIsLoading] = useState(false); // Загрузка при запросе к ИИ
  const [aiResult, setAiResult] = useState(null); // Результат от ИИ

  // Уведомление
  const [alertMessage, setAlertMessage] = useState(''); // Текст уведомления
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Видимость уведомления

  // Функция для показа уведомления
  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);

    // Автоматически скрыть уведомление через 3 секунды
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  // Загрузка заявок при монтировании компонента
  useEffect(() => {
    fetchRequests();
  }, []);

  // Функция для загрузки заявок с сервера
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://213.171.29.113:5000/requests/user/${profileData.id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
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

  // Проверка на существование заявки по названию элемента
  const checkExistingRequest = (name) => {
    const lowerCaseName = name.toLowerCase(); // Приводим название к нижнему регистру
    const existingActiveRequest = requests.find(
      (request) => request.name.toLowerCase() === lowerCaseName && request.is_active
    );
    const existingSolvedRequest = requests.find(
      (request) => request.name.toLowerCase() === lowerCaseName && !request.is_active
    );

    if (existingActiveRequest) {
      showAlert('Заявка с таким электронным компонентом уже создана. Ожидайте классификацию эксперта.');
      return true;
    }

    if (existingSolvedRequest) {
      showAlert('Такая заявка уже выполнена.');
      return true;
    }

    return false;
  };

  // Функция для создания новой заявки
  const createRequest = async () => {
    const trimmedName = newRequestName.trim();

    // Проверяем, не пустое ли название
    if (!trimmedName) {
      showAlert('Введите название компонента');
      return;
    }

    // Проверяем, существует ли такая заявка
    if (checkExistingRequest(trimmedName)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://213.171.29.113:5000/requests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заявки');
      }

      fetchRequests(); // Обновляем список заявок
      setIsPopupOpen(false); // Закрываем попап
      setNewRequestName(''); // Очищаем поле ввода
    } catch (error) {
      console.error('Ошибка:', error.message);
      showAlert(error.message);
    }
  };

  // Фильтрация заявок по активности
  const activeRequests = requests.filter((request) => request.is_active);
  const solvedRequests = requests.filter((request) => !request.is_active);

  // Функция для отправки запроса в ИИ
  const classifyWithAI = async () => {
    if (!aiInput.trim()) {
      showAlert('Введите название элемента');
      return;
    }

    setIsLoading(true);
    setAiResult(null);

    try {
      const response = await fetch(`http://213.171.29.113:5000/ec/ask?name=${encodeURIComponent(aiInput)}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Ошибка при классификации элемента');
      }

      const data = await response.json();
      setAiResult(data);
    } catch (error) {
      console.error('Ошибка:', error.message);
      showAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Расчет Trz и Tsx
  const calculateTrz = (lambda_bsg, className) => {
    const reliabilityFactor = className === 'Микросхемы интегральные' ? 0.99 : 0.975;
    return (1 / lambda_bsg) * Math.log(reliabilityFactor);
  };

  const calculateTsx = (lambda_hsg) => {
    return (1 / lambda_hsg) * Math.log(0.99);
  };

  return (
    <div className="user-requests-container">
      {/* Уведомление */}
      {isAlertVisible && (
        <div className="alert-overlay">
          <div className="alert-box">{alertMessage}</div>
        </div>
      )}

      {/* Верхние вкладки для выбора типа обработки */}
      <div className="processing-tabs">
        <button
          className={`processing-tab-button ${processingTab === 'expert' ? 'active' : ''}`}
          onClick={() => setProcessingTab('expert')}
        >
          Экспертная классификация
        </button>
        <button
          className={`processing-tab-button ${processingTab === 'ai' ? 'active' : ''}`}
          onClick={() => setProcessingTab('ai')}
        >
          AI-классификация
        </button>
      </div>

      {/* Контент вкладок обработки */}
      <div className="processing-content">
        {processingTab === 'expert' ? (
          <>
            {/* Верхний текст и кнопка "Создать заявку" */}
            <div className="info-section">
              <p className="info-text">
                Если Вы не нашли информации об электронном компоненте в нашем сервисе, Вы можете отправить
                заявку на классификацию элемента нашими экспертами.
              </p>
              <button className="create-request-button" onClick={() => setIsPopupOpen(true)}>
                Создать заявку
              </button>
            </div>

            {/* Нижние вкладки для фильтрации заявок */}
            <div className="request-tabs">
              <button
                className={`request-tab-button ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Активные заявки
              </button>
              <button
                className={`request-tab-button ${activeTab === 'solved' ? 'active' : ''}`}
                onClick={() => setActiveTab('solved')}
              >
                Обработанные заявки
              </button>
            </div>

            {/* Список заявок */}
            <div className="requests-list">
              {activeTab === 'active' ? (
                activeRequests.length > 0 ? (
                  activeRequests.map((request) => (
                    <div key={request.id} className="request-item__user">
                      <p className="request-name">{request.name}</p>
                      <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">Нет активных заявок</p>
                )
              ) : solvedRequests.length > 0 ? (
                solvedRequests.map((request) => (
                  <div key={request.id} className="request-item__user">
                    <p className="request-name">{request.name}</p>
                    <p className="request-date">{new Date(request.created_at).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="empty-message">Нет обработанных заявок</p>
              )}
            </div>
          </>
        ) : (
          // Вкладка AI-классификация
          <div className="ai-classification-section">
            <p className="ai-classification-text">
              Здесь вы можете в режиме реального времени классифицировать элемент с помощью искусственного
              интеллекта.
            </p>
            <div className="ai-input-container">
              <input
                type="text"
                placeholder="Введите название элемента"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="ai-classification-button"
                onClick={classifyWithAI}
                disabled={isLoading || !aiInput.trim()}
              >
                {isLoading ? 'Классифицирую...' : 'Классифицировать с ИИ'}
              </button>
            </div>
            {isLoading && (
              <div className="ai-loading">
                <div className="spinner"></div>
                <p>ИИ думает...</p>
              </div>
            )}
            {aiResult && (
              <div className="card-container card-container__ai">
                <h2 className="title__ai">{aiResult.component_name}</h2>

                {/* Классификация */}
                <div className="section">
                  <h3 className="section-title__ai">Классификация</h3>
                  <ul className="data-list">
                    <li className="data-item">
                      <span className="label">Класс:</span>
                      <span className="value">{aiResult.hierarchy[0]?.name || 'Не определен'}</span>
                    </li>
                    {aiResult.hierarchy[1] && (
                      <li className="data-item">
                        <span className="label">Группа:</span>
                        <span className="value">{aiResult.hierarchy[1]?.name}</span>
                      </li>
                    )}
                    {aiResult.hierarchy[2] && (
                      <li className="data-item">
                        <span className="label">Подгруппа:</span>
                        <span className="value">{aiResult.hierarchy[2]?.name}</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Характеристики надежности */}
                {aiResult.reliability && (
                  <div className="section">
                    <h3 className="section-title__ai">Характеристики надежности</h3>
                    <ul className="data-list">
                      <li className="data-item">
                        <span className="label">λ бсг:</span>
                        <span className="value">{aiResult.reliability.l_bsg_6_hour}×10⁶ 1/ч</span>
                      </li>
                      <li className="data-item">
                        <span className="label">λ хсг:</span>
                        <span className="value">{aiResult.reliability.l_hsg_8_hour}×10⁸ 1/ч</span>
                      </li>
                      <li className="data-item">
                        <span className="label">Ea:</span>
                        <span className="value">{aiResult.reliability.Eа} эВ</span>
                      </li>
                      <li className="data-item">
                      <span className="label">Трз:</span>
                      <span className="value">
                        {calculateTrz(
                          aiResult.reliability.l_bsg_6_hour,
                          aiResult.hierarchy[0]?.name
                        ).toFixed(2)}{' '}
                      </span>
                    </li>
                    <li className="data-item">
                      <span className="label">Тсх:</span>
                      <span className="value">
                        {calculateTsx(aiResult.reliability.l_hsg_8_hour).toFixed(2)}
                      </span>
                    </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
            <div className="popup-buttons__user">
              <button
                className="submit-button"
                onClick={createRequest}
                disabled={!newRequestName.trim()}
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