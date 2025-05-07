import React, { useState } from 'react';
import './ExpertRequests.css';

const catalogData = [
  {
    className: 'Микросхемы интегральные',
    groups: [
      {
        groupName: 'Цифровые',
        subgroups: [{ name: 'Логические элементы' }, { name: 'Арифметические элементы' }],
      },
      {
        groupName: 'Полупроводниковые аналоговые',
      },
    ],
  },
  {
    className: 'Генераторные, модуляторные, регулирующие лампы',
    groups: [
      { groupName: 'Лампы генераторные для работы в непрерывном режиме' },
      { groupName: 'Лампы генераторные для работы в импульсном режиме' },
    ],
  },
];

const ExpertRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Тестовый элемент 1',
      is_active: true,
      created_at: '2025-05-05T12:00:00',
    },
    {
      id: 2,
      name: 'Тестовый элемент 2',
      is_active: false,
      created_at: '2025-05-06T14:00:00',
    },
  ]);
  const [activeTab, setActiveTab] = useState('active');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Форма для классификации
  const [form, setForm] = useState({
    name: '',
    tuNumber: '',
    class: '',
    group: '',
    subgroup: '',
    additionalClassification: '',
    reliability: {
      lambda_bsg: '',
      lambda_bsx: '',
      Ea: '',
      Trz: '',
      Tsx: '',
    },
  });

  // Обновление формы при изменении значений
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('reliability.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        reliability: { ...prev.reliability, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Открытие попапа и заполнение формы данными заявки
  const openPopup = (request) => {
    setSelectedRequest(request);
    setForm({
      name: request.name,
      tuNumber: '',
      class: '',
      group: '',
      subgroup: '',
      additionalClassification: '',
      reliability: {
        lambda_bsg: '',
        lambda_bsx: '',
        Ea: '',
        Trz: '',
        Tsx: '',
      },
    });
    setIsPopupOpen(true);
  };

  // Сохранение данных формы
  const saveForm = () => {
    console.log('Сохраненные данные:', form);
    setIsPopupOpen(false);
    setSelectedRequest(null);
  };

  // Получение доступных групп на основе выбранного класса
  const getGroups = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    return selectedClass ? selectedClass.groups : [];
  };

  // Получение доступных подгрупп на основе выбранной группы
  const getSubgroups = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    if (!selectedClass) return [];
    const selectedGroup = selectedClass.groups.find((grp) => grp.groupName === form.group);
    return selectedGroup?.subgroups || [];
  };

  return (
    <div className="expert-requests-container">
      {/* Вкладки */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Активные заявки
        </button>
        <button
          className={`tab-button ${activeTab === 'solved' ? 'active' : ''}`}
          onClick={() => setActiveTab('solved')}
        >
          Обработанные заявки
        </button>
      </div>

      {/* Список заявок */}
      <div className="requests-list">
        {activeTab === 'active'
          ? requests
              .filter((req) => req.is_active)
              .map((req) => (
                <div
                  key={req.id}
                  className="request-item"
                  onClick={() => openPopup(req)}
                >
                  <p className="request-name">{req.name}</p>
                  <p className="request-date">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              ))
          : requests
              .filter((req) => !req.is_active)
              .map((req) => (
                <div key={req.id} className="request-item inactive">
                  <p className="request-name">{req.name}</p>
                  <p className="request-date">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              ))}
      </div>

      {/* Попап для классификации */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Классификация элемента</h3>
            <form className="classification-form two-columns scrollable">
              {/* Левый столбец: Классификация */}
              <div className="column">
                <h4>Классификация</h4>
                <label>
                  Название:
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    readOnly
                  />
                </label>
                <label>
                  Номер ТУ:
                  <input
                    type="text"
                    name="tuNumber"
                    value={form.tuNumber}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Класс:
                  <select
                    name="class"
                    value={form.class}
                    onChange={handleFormChange}
                  >
                    <option value="">Выберите класс</option>
                    {catalogData.map((cls, i) => (
                      <option key={i} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Группа:
                  <select
                    name="group"
                    value={form.group}
                    onChange={handleFormChange}
                    disabled={!form.class}
                  >
                    <option value="">Выберите группу</option>
                    {getGroups().map((grp, i) => (
                      <option key={i} value={grp.groupName}>
                        {grp.groupName}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Подгруппа:
                  <select
                    name="subgroup"
                    value={form.subgroup}
                    onChange={handleFormChange}
                    disabled={!form.group}
                  >
                    <option value="">Выберите подгруппу</option>
                    {getSubgroups().map((sub, i) => (
                      <option key={i} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Дополнительная классификация:
                  <select
                    name="additionalClassification"
                    value={form.additionalClassification}
                    onChange={handleFormChange}
                    disabled={!form.subgroup}
                  >
                    <option value="">Выберите дополнительную классификацию</option>
                    {getSubgroups()
                      .find((sub) => sub.name === form.subgroup)?.classification?.map((cls, i) => (
                        <option key={i} value={cls}>
                          {cls}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              {/* Правый столбец: Характеристики надежности */}
              <div className="column">
                <h4>Характеристики надежности</h4>
                <label>
                  λ бсг:
                  <input
                    type="number"
                    name="reliability.lambda_bsg"
                    value={form.reliability.lambda_bsg}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  λ бсх:
                  <input
                    type="number"
                    name="reliability.lambda_bsx"
                    value={form.reliability.lambda_bsx}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Ea:
                  <input
                    type="number"
                    name="reliability.Ea"
                    value={form.reliability.Ea}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Трз:
                  <input
                    type="number"
                    name="reliability.Trz"
                    value={form.reliability.Trz}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Тсх:
                  <input
                    type="number"
                    name="reliability.Tsx"
                    value={form.reliability.Tsx}
                    onChange={handleFormChange}
                  />
                </label>
              </div>
            </form>
            <div className="popup-buttons">
              <button type="button" className="save-button" onClick={saveForm}>
                Сохранить
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsPopupOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertRequests;