/*import React, { useState } from 'react';
import './ExpertRequests.css';

const catalogData = [
    {
        className: 'Микросхемы интегральные',
        groups: [
            {
                groupName: 'Цифровые',
                subgroups: [
                    { name: 'Логические элементы' },
                    { name: 'Арифметические элементы' },
                    { name: 'Преобразователи уровней' },
                    { name: 'Регистры сдвига' },
                    { name: 'Линейные приёмник/передатчик' },
                    { name: 'Базовые матричные кристаллы' },
                    { name: 'Аналоговые элементы' },
                    { name: 'Программируемые логические матрицы' },
                    { name: 'Диодные матрицы памяти' },
                    { name: 'Специальная логика / интерфейсы' },
                    { name: 'Оперативные запоминающие устройства ( ОЗУ )' },
                    { name: 'Постоянные запоминающие устройства ( ПЗУ )' },
                    { name: 'Программируемые постоянные запоминающие устройства ( ППЗУ )' },
                    { name: 'Перепрограммируемые постоянные запоминающие устройства ( РПЗУ )' },
                ],
            },
            {
                groupName: 'Полупроводниковые аналоговые',
            },
            {
                groupName: 'Интегральные гибридные',
            },
        ],
    },

    {
        className: 'Приборы полупроводниковые, кроме приборов СВЧ диапазона',
        groups: [
            {
                groupName: 'Диоды полупроводниковые',
                subgroups: [
                    { name: 'Диоды выпрямительные' },
                    { name: 'Диоды импульсные' },
                    { name: 'Столбы выпрямительные' },
                    { name: 'Варикапы подстроечные' },
                    { name: 'Сборки диодные' },
                    { name: 'Стабилитроны' },
                    { name: 'Ограничители напряжения' },
                    { name: 'Генераторы шума' },
                    {
                        name: 'Транзисторы биполярные кремниевые',
                        classification: ['Малой мощности', 'Средней мощности', 'Большой мощности'],
                    },
                    { name: 'Сборки транзисторные кремниевые' },
                    {
                        name: 'Транзисторы полевые',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                    { name: 'Тиристоры кремниевые' },
                ],
            },
        ],
    },

    {
        className: 'Приборы полупроводниковые СВЧ диапазона',
        groups: [
            {
                groupName: 'Диоды СВЧ',
                subgroups: [
                    {
                        name: 'Смесительные',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                    {
                        name: 'Детекторные',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                    {
                        name: 'Параметрические',
                        classification: ['Арсенидогаллиевые'],
                    },
                    {
                        name: 'Переключательные и ограничительные',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                    {
                        name: 'Умножительные и настроечные',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                    {
                        name: 'Генераторные',
                        classification: ['Кремниевые', 'Арсенидогаллиевые'],
                    },
                ],
            },
            {
                groupName: 'Транзисторы СВЧ биполярные кремниевые',
                subgroups: [
                    { name: 'Малой и средней мощности' },
                    { name: 'Большой мощности' },
                ],
            },
            {
                groupName: 'Сборки транзисторные СВЧ',
            },
        ],
    },


    {
        className: 'Оптоэлектронные полупроводниковые приборы',
        groups: [
            {
                groupName: 'Излучатели полупроводниковые',
                subgroups: [
                    { name: 'Инфракрасного диапазона' },
                    { name: 'Видимого диапазона' },
                ],
            },
            {
                groupName: 'Оптопары',
                subgroups: [
                    { name: 'Диодные' },
                    { name: 'Транзисторные' },
                    { name: 'Тиристорные' },
                    { name: 'Резисторные' },
                ],
            },
            {
                groupName: 'Микросхемы оптоэлектронные',
                subgroups: [
                    { name: 'Переключатели логических сигналов' },
                    { name: 'Коммутаторы аналоговых сигналов' },
                ],
            },
        ],
    },

    {
        className: 'Изделия кантовой электроники',
        groups: [
            {
                groupName: 'Лазеры и излучатели полупроводниковые',
                subgroups: [
                    { name: 'Инжекционные лазеры импульсного режима работы' },
                    { name: 'Блоки приемо-передающие' },
                    { name: 'Излучатели инжекционных лазеров импульсного режима работы' },
                    { name: 'Излучатели инжекционных лазеров непрерывного режима работы' },
                ],
            },
            {
                groupName: 'Лазеры твердотельные на алюмо-иттриевом гранате с импульсной накачкой',
            },
            {
                groupName: 'Лазеры газовые гелий-неоновые',
            },
            {
                groupName: 'Элементы лазерные активные',
                subgroups: [
                    { name: 'из алюмо-иттриевого граната непрерывного режима работы' },
                    { name: 'из алюмо-иттриевого граната импульсного режима работы' },
                    { name: 'из галлий-скандий-гадолиниевого граната импульсного режима работы' },
                    { name: 'из алюмината иттрия' },
                ],
            },
            {
                groupName: 'Устройства управления лазерным излучением',
                subgroups: [
                    {
                        name: 'Затворы лазерные',
                        classification: ['Затворы электрооптические', 'Затворы пассивные', 'Затворы акустоопртические']
                    },
                    { name: 'Преобразователи частоты лазерного излучения' }
                ],
            },
            {
                groupName: 'Пироэлектрические модули',
            },

        ],
    },


    {
        className: 'Генераторные, модуляторные, регулирующие лампы',
        groups: [
            {
                groupName: 'Лампы генераторные для работы в непрерывном режиме',
            },
            {
                groupName: 'Лампы генераторные для работы в импульсном режиме',
            },
            {
                groupName: 'Лампы модуляторные для работы в импульсном режиме',
            },
            {
                groupName: 'Лампы регулирующие (без ГМ-2, ГМ-4)',
            },
        ],
    },

    
    {
        className: 'Газоразрядные приборы и высоковольтные кенотроны',
        groups: [
            {
                groupName: 'Газотроны',
            },
            {
                groupName: 'Тиратроны импульсные',
                subgroups: [
                    { name: 'С накаленным катодом' },
                    { name: 'С холодным катодом' },
                    { name: 'Управляемые (таситроны)' },
                    { name: 'Тлеющего разряда' },
                ],
            },
            {
                groupName: 'Разрядники нерезонансные',
                subgroups: [
                    { name: 'Неуправляемые' },
                    { name: 'Управляемые' },
                ],
            },
            {
                groupName: 'Счетчики ионизирующих излучений',
                subgroups: [
                    { name: 'В импульсном режиме' },
                    { name: 'В токовом режиме' },
                ],
            },
            {
                groupName: 'Высоковольтные кенотроны',
            },
        ],
    },

    {
        className: 'Трубки электронно-лучевые приемные и преобразовательные',
        groups: [
            {
                groupName: 'Трубки приемные',
                subgroups: [
                    { name: 'Индикаторные монохромные без запоминания' },
                    { name: 'Индикаторные монохромные с запоминанием' },
                    { name: 'Индикаторные цветные без запоминания' },
                    { name: 'Знакопечатающие' },
                    { name: 'Осциллографические без запоминания' },
                    { name: 'Осциллографические с запоминанием' },
                    { name: 'Кинескопы монохромные' },
                    { name: 'Кинескопы цветные' },
                    { name: 'Трубки фоторегистрирующие' },
                    { name: 'Трубки проекционные' },
                ],
            },
            {
                groupName: 'Трубки преобразовательные',
                subgroups: [
                    { name: 'Запоминающие без видимого изображения' },
                    { name: 'Функциональные' },
                ],
            },
        ],
    },

    {
        className: 'Законосинтезирующие индикаторы',
        groups: [
            {
                groupName: 'Индикаторы без встроенного управления',
                subgroups: [
                    { name: 'Единичные',
                        classification: ['Вакуумные люминесцентные', 'Газоразрядные', 'Жидкокристаллические', 'Полупроводниковые', 'Сегнетокерамические'],
                     },
                    { name: 'Цифровые',
                        classification: ['Вакуумные накаливаемые', 'Газоразрядные', 'Жидкокристаллические', 'Полупроводниковые', 'Сегнетокерамические'],
                     },
                     { name: 'Буквенно-цифровые',
                        classification: ['Вакуумные люминесцентные', 'Газоразрядные', 'Полупроводниковые'],
                     },
                     { name: 'Шкальные',
                        classification: ['Вакуумные люминесцентные', 'Газоразрядные', 'Жидкокристаллические','Полупроводниковые'],
                     },
                     { name: 'Мнемонические',
                        classification: ['Вакуумные люминесцентные', 'Электролюминесцентные', 'Жидкокристаллические','Полупроводниковые'],
                     },
                     { name: 'Графические',
                        classification: ['Жидкокристаллические','Полупроводниковые', 'Газоразрядные', 'Вакуумные люминесцентные'],
                     },
                ],
            },
            {
                groupName: 'Индикаторы со встроенным управлением',
                subgroups: [
                    { name: 'Цифровые',
                        classification: ['Полупроводниковые'],
                     },
                     { name: 'Буквенно-цифровые',
                        classification: ['Газоразрядные', 'Полупроводниковые', 'Жидкокристаллические'],
                     },
                     { name: 'Графические',
                        classification: ['Жидкокристаллические','Газоразрядные'],
                     },
                ],
            },
        ],
    },
    {
        className: 'Фотоэлекронные приборы',
        groups: [
            {
                groupName: 'Передающие телевизионные трубки',
                subgroups: [
                    { name: 'Суперортиконы'},
                    { name: 'Видиконы'},
                    { name: 'Диссекторы'},
                    { name: 'Супервидиконы'},
                    { name: 'Многомодульные'},
                ],
            },
            {
                groupName: 'Фотоэлектронные умножители',
                subgroups: [
                    { name: 'Общего применения'},
                    { name: 'Сцинтилляционные'},
                    { name: 'Быстродействующие'},
                    { name: 'Одноэлектронные'},
                ],
            },
            { groupName: 'Преобразователи электронно-оптические и блоки' },
        ],
    },


    {
        className: 'Фотоэлектрические приборы',
        groups: [
            {
                groupName: 'Фотодиоды',
                subgroups: [
                    { name: 'Неохлаждаемые на основе кремния'},
                    { name: 'Неохлаждаемые на основе германия'},
                    { name: 'Неохлаждаемые на основе InGaAsP'},
                    { name: 'Охлаждаемые на основе InSb'},
                    { name: 'Многомодульные'},
                ],
            },
            {
                groupName: 'Фоторезисторы',
                subgroups: [
                    { name: 'Неохлаждаемые на основе PbS'},
                    { name: 'Охлаждаемые на основе InSb'},
                    { name: 'Охлаждаемые на основе CdHgTe'},
                    { name: 'Охлаждаемые на основе PbSe'},
                ],
            },
            { groupName: 'Фототранзисторы' },
            { groupName: 'Фотоприемные устройства' },
            { groupName: 'Приборы фоточувствительные с переносом заряда' },
        ],
    },

    {
        className: 'Пьезоэлектриеские приборы и электромеханчесике фильтры',
        groups: [
            { groupName: 'Резонаторы пьезоэлектрические простые'},
            { groupName: 'Резонаторы пьезоэлектрические прецизионные'},
            { groupName: 'Резонаторы пьезоэлектрические с внутренним подогревом (резонаторы-термостаты)'},
            { groupName: 'Генераторы пьезоэлектрические простые' },
            { groupName: 'Генераторы пьезоэлектрические термокомпенсируемые' },
            { groupName: 'Генераторы пьезоэлектрические термостатированные' },
            { groupName: 'Фильтры пьезоэлектрические полосовые кварцевые' },
            { groupName: 'Фильтры пьезоэлектрические полосовые пьезокерамические' },
            { groupName: 'Фильтры пьезоэлектрические полосовые пьезокристаллические' },
            { groupName: 'Фильтры пьезоэлектрические режекторные и дискриминаторные кварцевые' },
            { groupName: 'Частотно-избирательные микроблоки' },
            { groupName: 'Элементы пьезоэлектрические' },
            { groupName: 'Преобразователи и датчики пьезоэлектрические' },
            { groupName: 'Фильтры электромеханические полосовые' },
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

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form className="classification-form two-columns scrollable">
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

export default ExpertRequests;*/

/*import React, { useState, useEffect } from 'react';
import './ExpertRequests.css';
import { catalogData } from './catalogData';

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
    },
  });

  // Получение данных с сервера
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token'); // Замените на реальный токен
      const response = await fetch('http://213.171.29.113:5000/requests', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error('Ошибка при получении заявок:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  // Вызываем fetchRequests при монтировании компонента
  useEffect(() => {
    fetchRequests();
  }, []);

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
      },
    });
    setIsPopupOpen(true);
  };

  // Закрытие попапа
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRequest(null);
  };

  // Показать подтверждение отправки
  const showConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  // Закрыть подтверждение отправки
  const hideConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  // Отправка данных на бэкенд
  const sendToBackend = async () => {
    const token = localStorage.getItem('token'); // Замените на реальный токен
    const requestBody = {
      request_id: selectedRequest.id,
      name: form.name || '',
      tu_number: form.tuNumber || '',
      cl_1: form.class || '',
      cl_2: form.group || '',
      cl_3: form.subgroup || '',
      cl_4: form.additionalClassification || '',
      l_bsg: parseFloat(form.reliability.lambda_bsg) || 0,
      l_hsg: parseFloat(form.reliability.lambda_bsx) || 0,
      Ea: parseFloat(form.reliability.Ea) || 0,
      origin:'rf'
    };

    try {
      const response = await fetch('http://213.171.29.113:5000/requests/resolve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Данные успешно отправлены на бэкенд');
        closePopup(); // Закрываем попап классификации
        hideConfirmation(); // Закрываем попап подтверждения
        fetchRequests(); // Обновляем список заявок
      } else {
        console.error('Ошибка при отправке данных на бэкенд');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }

    hideConfirmation();
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

  // Получение доступных дополнительных классификаций на основе выбранной подгруппы
  const getClassifications = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    if (!selectedClass) return [];
    const selectedGroup = selectedClass.groups.find((grp) => grp.groupName === form.group);
    if (!selectedGroup) return [];
    const selectedSubgroup = selectedGroup.subgroups.find((sub) => sub.name === form.subgroup);
    return selectedSubgroup?.classification || [];
  };

  return (
    <div className="expert-requests-container">
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

      {isPopupOpen && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup">
            <form className="classification-form two-columns scrollable">
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
                {getClassifications().length > 0 && (
                  <label>
                    Дополнительная классификация:
                    <select
                      name="additionalClassification"
                      value={form.additionalClassification}
                      onChange={handleFormChange}
                      disabled={!form.subgroup}
                    >
                      <option value="">Выберите дополнительную классификацию</option>
                      {getClassifications().map((cls, i) => (
                        <option key={i} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

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
              </div>
            </form>
            <div className="popup-buttons">
              <button type="button" className="save-button" onClick={showConfirmation}>
                Сохранить
              </button>
              <button type="button" className="cancel-button" onClick={closePopup}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="confirmation-popup">
          <p>
            Вы уверены, что хотите добавить элемент "{form.name}" в базу данных?
          </p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={sendToBackend}>
              Да
            </button>
            <button className="cancel-button" onClick={hideConfirmation}>
              Нет
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertRequests;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpertRequests.css';
import { catalogData } from './catalogData';

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

   const navigate = useNavigate();

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
    },
  });

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://213.171.29.113:5000/requests', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error('Ошибка при получении заявок:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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

  const openPopup = (request = null) => {
    setSelectedRequest(request);
    setForm({
      name: request ? request.name : '',
      tuNumber: '',
      class: '',
      group: '',
      subgroup: '',
      additionalClassification: '',
      reliability: {
        lambda_bsg: '',
        lambda_bsx: '',
        Ea: '',
      },
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRequest(null);
  };

  const showConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const hideConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const sendToBackend = async () => {
    const token = localStorage.getItem('token');
    const requestBody = {
      request_id: selectedRequest?.id || null,
      name: form.name || '',
      tu_number: form.tuNumber || '',
      cl_1: form.class || '',
      cl_2: form.group || '',
      cl_3: form.subgroup || '',
      cl_4: form.additionalClassification || '',
      l_bsg: parseFloat(form.reliability.lambda_bsg) || 0,
      l_hsg: parseFloat(form.reliability.lambda_bsx) || 0,
      Ea: parseFloat(form.reliability.Ea) || 0,
      origin: 'rf',
    };

    try {
      const response = await fetch('http://213.171.29.113:5000/requests/resolve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        console.log('Данные успешно отправлены на бэкенд');
        closePopup();
        hideConfirmation();
        fetchRequests();
      } else {
        console.error('Ошибка при отправке данных на бэкенд');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
    hideConfirmation();
  };

  const getGroups = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    return selectedClass ? selectedClass.groups : [];
  };

  const getSubgroups = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    if (!selectedClass) return [];
    const selectedGroup = selectedClass.groups.find((grp) => grp.groupName === form.group);
    return selectedGroup?.subgroups || [];
  };

  const getClassifications = () => {
    const selectedClass = catalogData.find((cls) => cls.className === form.class);
    if (!selectedClass) return [];
    const selectedGroup = selectedClass.groups.find((grp) => grp.groupName === form.group);
    if (!selectedGroup) return [];
    const selectedSubgroup = selectedGroup.subgroups.find((sub) => sub.name === form.subgroup);
    return selectedSubgroup?.classification || [];
  };

  return (
    <div className="expert-requests-container">

        {/* Кнопка добавления компонента */}
      <div className="add-component-button-wrapper">
        <button className="add-component-button" onClick={() => openPopup(null)}>Добавить электронный компонент</button>
      </div>
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Активные заявки</button>
        <button className={`tab-button ${activeTab === 'solved' ? 'active' : ''}`} onClick={() => setActiveTab('solved')}>Обработанные заявки</button>
      </div>

      

      <div className="requests-list">
        {activeTab === 'active'
          ? requests.filter((req) => req.is_active).map((req) => (
              <div key={req.id} className="request-item" onClick={() => openPopup(req)}>
                <p className="request-name">{req.name}</p>
                <p className="request-date">{new Date(req.created_at).toLocaleDateString()}</p>
              </div>
            ))
          : requests.filter((req) => !req.is_active).map((req) => (
              <div key={req.id} className="request-item inactive" onClick={() => navigate(`/component/${req.id}`)}>
                <p className="request-name">{req.name}</p>
                <p className="request-date">{new Date(req.created_at).toLocaleDateString()}</p>
              </div>
            ))}
      </div>

      {/* Попап для классификации */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup">
            <form className="classification-form two-columns scrollable">
              <div className="column">
                <h4>Классификация</h4>
                <label className='expert-requests__label'>
                  Название:
                  <input type="text" name="name" value={form.name} onChange={handleFormChange} readOnly={!!selectedRequest} />
                </label>
                <label className='expert-requests__label'>
                  Номер ТУ:
                  <input type="text" name="tuNumber" value={form.tuNumber} onChange={handleFormChange} />
                </label>
                <label className='expert-requests__label'>
                  Класс:
                  <select name="class" value={form.class} onChange={handleFormChange}>
                    <option value="">Выберите класс</option>
                    {catalogData.map((cls, i) => (
                      <option key={i} value={cls.className}>{cls.className}</option>
                    ))}
                  </select>
                </label>
                <label className='expert-requests__label'>
                  Группа:
                  <select name="group" value={form.group} onChange={handleFormChange} disabled={!form.class}>
                    <option value="">Выберите группу</option>
                    {getGroups().map((grp, i) => (
                      <option key={i} value={grp.groupName}>{grp.groupName}</option>
                    ))}
                  </select>
                </label>
                <label className='expert-requests__label'>
                  Подгруппа:
                  <select name="subgroup" value={form.subgroup} onChange={handleFormChange} disabled={!form.group}>
                    <option value="">Выберите подгруппу</option>
                    {getSubgroups().map((sub, i) => (
                      <option key={i} value={sub.name}>{sub.name}</option>
                    ))}
                  </select>
                </label>
                {getClassifications().length > 0 && (
                  <label className='expert-requests__label'>
                    Дополнительная классификация:
                    <select name="additionalClassification" value={form.additionalClassification} onChange={handleFormChange} disabled={!form.subgroup}>
                      <option value="">Выберите дополнительную классификацию</option>
                      {getClassifications().map((cls, i) => (
                        <option key={i} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              <div className="column">
                <h4>Характеристики надежности</h4>
                <label className='expert-requests__label'>
                  λ бсг:
                  <input type="number" name="reliability.lambda_bsg" value={form.reliability.lambda_bsg} onChange={handleFormChange} />
                </label>
                <label className='expert-requests__label'>
                  λ бсх:
                  <input type="number" name="reliability.lambda_bsx" value={form.reliability.lambda_bsx} onChange={handleFormChange} />
                </label>
                <label className='expert-requests__label'>
                  Ea:
                  <input type="number" name="reliability.Ea" value={form.reliability.Ea} onChange={handleFormChange} />
                </label>
              </div>
            </form>
            <div className="popup-buttons">
              <button type="button" className="save-button" onClick={showConfirmation}>Сохранить</button>
              <button type="button" className="cancel-button" onClick={closePopup}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="confirmation-popup">
          <p>Вы уверены, что хотите добавить элемент "{form.name}" в базу данных?</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={sendToBackend}>Да</button>
            <button className="cancel-button" onClick={hideConfirmation}>Нет</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertRequests;