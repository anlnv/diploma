import React, { useState, useEffect } from 'react';
import './ExpertRequests.css';
import { catalogData } from './catalogData';

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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
      l_bsg_6_hour_cycle: '',
      l_bsg_6_imp: '',
      l_bsg_6_hour_srab: '',
      l_bsg_6_pb: '',
      l_bsg_6_vkl: ''
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
        l_bsg_6_hour_cycle: '',
        l_bsg_6_imp: '',
        l_bsg_6_hour_srab: '',
        l_bsg_6_pb: '',
        l_bsg_6_vkl: '',
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
      l_bsg: parseFloat(form.reliability.lambda_bsg) || null,
      l_hsg: parseFloat(form.reliability.lambda_bsx) || null,
      Ea: parseFloat(form.reliability.Ea) || null,
      l_bsg_6_hour_cycle: parseFloat(form.reliability.l_bsg_6_hour_cycle) || null,
      l_bsg_6_imp: parseFloat(form.reliability.l_bsg_6_imp) || null,
      l_bsg_6_hour_srab: parseFloat(form.reliability.l_bsg_6_hour_srab) || null,
      l_bsg_6_pb: parseFloat(form.reliability.l_bsg_6_pb) || null,
      l_bsg_6_vkl: parseFloat(form.reliability.l_bsg_6_vkl) || null,
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
    return selectedSubgroup?.classifications || [];
  };

  return (
    <div className="expert-requests-container">
      {/* Верхние вкладки */}
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
                <div key={req.id} className="request-item active" onClick={() => openPopup(req)}>
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
        <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="popup">
            <form className="classification-form two-columns scrollable">
              <div className="column">
                <h4>Классификация</h4>
                <label className="expert-requests__label">
                  <span>Название:</span>
                  <input
                    className="input__expert"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    readOnly
                  />
                </label>
                <label className="expert-requests__label">
                  <span>Номер ТУ:</span>
                  <input
                    className="input__expert"
                    type="text"
                    name="tuNumber"
                    value={form.tuNumber}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>Класс:</span>
                  <select className="select__expert" name="class" value={form.class} onChange={handleFormChange}>
                    <option value="">Выберите класс</option>
                    {catalogData.map((cls, i) => (
                      <option key={i} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="expert-requests__label">
                  <span>Группа:</span>
                  <select className="select__expert" name="group" value={form.group} onChange={handleFormChange} disabled={!form.class}>
                    <option value="">Выберите группу</option>
                    {getGroups().map((grp, i) => (
                      <option key={i} value={grp.groupName}>
                        {grp.groupName}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="expert-requests__label">
                  <span>Подгруппа:</span>
                  <select className="select__expert" name="subgroup" value={form.subgroup} onChange={handleFormChange} disabled={!form.group}>
                    <option value="">Выберите подгруппу</option>
                    {getSubgroups().map((sub, i) => (
                      <option key={i} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </label>
                {getClassifications().length > 0 && (
                  <label className="expert-requests__label">
                    <span>Дополнительная классификация:</span>
                    <select
                      className="select__expert"
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
                <label className="expert-requests__label">
                  <span>λ бсг, ×10⁶ 1/ч:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.lambda_bsg"
                    value={form.reliability.lambda_bsg}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>λ бсх, ×10⁸ 1/ч:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.lambda_bsx"
                    value={form.reliability.lambda_bsx}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>Ea, эВ:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.Ea"
                    value={form.reliability.Ea}
                    onChange={handleFormChange}
                  />
                </label>
                {/* Новые поля */}
                <label className="expert-requests__label">
                  <span>λ бсг, цикл/ч×10⁶:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.l_bsg_6_hour_cycle"
                    value={form.reliability.l_bsg_6_hour_cycle}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>λ бсг, имп/ч×10⁶:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.l_bsg_6_imp"
                    value={form.reliability.l_bsg_6_imp}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>λ бсг, сраб/ч×10⁶:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.l_bsg_6_hour_srab"
                    value={form.reliability.l_bsg_6_hour_srab}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>λ бсг, пб/ч×10⁶:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.l_bsg_6_pb"
                    value={form.reliability.l_bsg_6_pb}
                    onChange={handleFormChange}
                  />
                </label>
                <label className="expert-requests__label">
                  <span>λ бсг, вкл/ч×10⁶:</span>
                  <input
                    className="input__expert"
                    type="number"
                    name="reliability.l_bsg_6_vkl"
                    value={form.reliability.l_bsg_6_vkl}
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

      {/* Попап подтверждения */}
      {isConfirmationOpen && (
        <div className="confirmation-popup-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="confirmation-popup">
            <p>Вы уверены, что хотите сохранить изменения?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={sendToBackend}>
                Да
              </button>
              <button className="cancel-button" onClick={hideConfirmation}>
                Нет
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertRequests;