/*import { useParams } from 'react-router-dom';
import './component.css';

const Component = ({ components }) => {
  const { id } = useParams();
  const component = components.find(item => item.id === parseInt(id));
  
  if (!component) return <div className="not-found">Компонент не найден</div>;

  const { 
    name,
    class: cls,
    group,
    subgroup,
    tuNumber,
    reliability
  } = component;

  return (
    <div className="card-container">
      <h2 className="title">{name}</h2>
      
      <div className="section">
        <h3 className="section-title">Классификация</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">Класс:</span>
            <span className="value">{cls}</span>
          </li>
          <li className="data-item">
            <span className="label">Группа:</span>
            <span className="value">{group}</span>
          </li>
          <li className="data-item">
            <span className="label">Подгруппа:</span>
            <span className="value">{subgroup}</span>
          </li>
          <li className="data-item tu-number">
            <span className="label">Номер ТУ:</span>
            <span className="value">{tuNumber}</span>
          </li>
        </ul>
      </div>

      <div className="section">
        <h3 className="section-title">Характеристики надежности</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">λ бсг:</span>
            <span className="value">{reliability.lambdaBSG}</span>
          </li>
          <li className="data-item">
            <span className="label">λ бсх:</span>
            <span className="value">{reliability.lambdaBSH}</span>
          </li>
          <li className="data-item">
            <span className="label">Ea:</span>
            <span className="value">{reliability.Ea}</span>
          </li>
          <li className="data-item">
            <span className="label">Трз:</span>
            <span className="value">{reliability.Trz}</span>
          </li>
          <li className="data-item">
            <span className="label">Тсх:</span>
            <span className="value">{reliability.Tsx}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Component;*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './component.css';

const Component = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Функция для получения данных с бэкенда
  const fetchComponentData = async () => {
    try {
      const token = localStorage.getItem('token'); // Замените на реальный токен
      const response = await fetch(`http://213.171.29.113:5000/ec/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComponent(data);
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных компонента:', response.statusText);
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setError(true);
      setLoading(false);
    }
  };

  // Вызываем fetchComponentData при монтировании компонента
  useEffect(() => {
    fetchComponentData();
  }, [id]);

  // Если данные еще загружаются
  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div className="error">Произошла ошибка при загрузке данных</div>;
  }

  // Если компонент не найден
  if (!component) {
    return <div className="not-found">Компонент не найден</div>;
  }

  // Разбор данных из ответа
  const { component_name, hierarchy, reliability } = component;

  // Извлечение уровней классификации
  const classLevel = hierarchy.find((item) => item.level === 1)?.name || '';
  const groupLevel = hierarchy.find((item) => item.level === 2)?.name || '';
  const subgroupLevel = hierarchy.find((item) => item.level === 3)?.name || '';
  const additionalClassification = hierarchy.find((item) => item.level === 4)?.name || '';

  return (
    <div className="card-container">
      <h2 className="title">{component_name}</h2>

      {/* Классификация */}
      <div className="section">
        <h3 className="section-title">Классификация</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">Класс:</span>
            <span className="value">{classLevel}</span>
          </li>
          <li className="data-item">
            <span className="label">Группа:</span>
            <span className="value">{groupLevel}</span>
          </li>
          <li className="data-item">
            <span className="label">Подгруппа:</span>
            <span className="value">{subgroupLevel}</span>
          </li>
          {additionalClassification && (
            <li className="data-item">
              <span className="label">Дополнительная классификация:</span>
              <span className="value">{additionalClassification}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Характеристики надежности */}
      <div className="section">
        <h3 className="section-title">Характеристики надежности</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">λ бсг:</span>
            <span className="value">{reliability.l_bsg_6_hour}×10⁶ 1/ч</span>
          </li>
          <li className="data-item">
            <span className="label">λ хсг:</span>
            <span className="value">{reliability.l_hsg_8_hour}×10⁸ 1/ч</span>
          </li>
          <li className="data-item">
            <span className="label">Ea:</span>
            <span className="value">{reliability.E_a}</span>
          </li>
          <li className="data-item">
            <span className="label">Трз:</span>
            <span className="value">{reliability.T_p}</span>
          </li>
          <li className="data-item">
            <span className="label">Тсх:</span>
            <span className="value">{reliability.T_cx}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Component;