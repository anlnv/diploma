/*import React, { useState } from 'react';
import './catalog.css';
import { catalogData } from './catalogData';


export default function Catalog() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expandedSubgroup, setExpandedSubgroup] = useState(null);

  return (
    <div className="catalog-container">
      <div className="catalog-sidebar">
        <h3 className="catalog-title">Классы</h3>
        <div className="catalog-list">
          {catalogData.map((cls, i) => (
            <div
              key={i}
              className={`catalog-item ${selectedClass === i ? 'active' : ''}`}
              onClick={() => {
                setSelectedClass(i);
                setSelectedGroup(null);
                setExpandedSubgroup(null);
              }}
            >
              <span>{cls.className}</span>
              {cls.groups && cls.groups.length > 0 && (
                <span className={`arrow ${selectedClass === i ? 'visible' : ''}`}>▶</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedClass !== null && catalogData[selectedClass]?.groups && (
        <div className="catalog-sidebar">
          <h3 className="catalog-title">Группы</h3>
          <div className="catalog-list">
            {catalogData[selectedClass].groups.map((grp, j) => (
              <div
                key={j}
                className={`catalog-item ${selectedGroup === j ? 'active' : ''}`}
                onClick={() => {
                  setSelectedGroup(j);
                  setExpandedSubgroup(null);
                }}
              >
                <span>{grp.groupName}</span>
                {grp.subgroups && grp.subgroups.length > 0 && (
                  <span className={`arrow ${selectedGroup === j ? 'visible' : ''}`}>▶</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedGroup !== null &&
       catalogData[selectedClass]?.groups?.[selectedGroup]?.subgroups && (
        <div className="catalog-sidebar">
          <h3 className="catalog-title">Подгруппы</h3>
          <div className="catalog-list">
            {catalogData[selectedClass].groups[selectedGroup].subgroups.map((sub, k) => (
              <div key={k}>
                <div
                  className={`catalog-item ${expandedSubgroup === k ? 'active' : ''}`}
                  onClick={() => {
                    if (sub.classification) {
                      setExpandedSubgroup(expandedSubgroup === k ? null : k);
                    }
                  }}
                >
                  <span>{sub.name}</span>
                  {sub.classification && sub.classification.length > 0 && (
                    <span className={`arrow ${expandedSubgroup === k ? 'visible' : ''}`}>▶</span>
                  )}
                </div>
                {expandedSubgroup === k && sub.classification && (
                  <div className="powers-list">
                    {sub.classification.map((power, p) => (
                      <div key={p} className="power-item">
                        {power}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}*/

import React, { useState } from 'react';
import './catalog.css';
import { catalogData } from './catalogData';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expandedSubgroup, setExpandedSubgroup] = useState(null);
  const [components, setComponents] = useState([]); // Список элементов с бэка
  const navigate = useNavigate();

  // Функция для выполнения GET-запроса к бэкенду
  const fetchComponents = async (classificationName) => {
    try {
      const token = localStorage.getItem('token'); // Замените на реальный токен
      const response = await fetch(`http://213.171.29.113:5000/catalog/${classificationName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComponents(data);
        console.log(data) // Сохраняем список элементов
      } else {
        console.error('Ошибка при получении данных:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  // Обработчик клика на класс
  const handleClassClick = (clsIndex) => {
    setSelectedClass(clsIndex);
    setSelectedGroup(null);
    setExpandedSubgroup(null);
    setComponents([]); // Очищаем предыдущие данные

    const classificationName = catalogData[clsIndex].className;
    if (!catalogData[clsIndex].groups || catalogData[clsIndex].groups.length === 0) {
      fetchComponents(classificationName); // Если нет групп, делаем запрос по классу
    }
  };

  // Обработчик клика на группу
  const handleGroupClick = (grpIndex) => {
    setSelectedGroup(grpIndex);
    setExpandedSubgroup(null);
    setComponents([]); // Очищаем предыдущие данные

    const classificationName = catalogData[selectedClass].groups[grpIndex].groupName;
    if (
      !catalogData[selectedClass].groups[grpIndex].subgroups ||
      catalogData[selectedClass].groups[grpIndex].subgroups.length === 0
    ) {
      fetchComponents(classificationName); // Если нет подгрупп, делаем запрос по группе
    }
  };

  // Обработчик клика на подгруппу
  const handleSubgroupClick = (subIndex) => {
    setExpandedSubgroup(subIndex);
    setComponents([]); // Очищаем предыдущие данные

    const classificationName = catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].name;
    if (
      !catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].classification ||
      catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].classification.length === 0
    ) {
      fetchComponents(classificationName); // Если нет дополнительной классификации, делаем запрос по подгруппе
    }
  };

  return (
    <div className="catalog-container">
      {/* Столбец классов */}
      <div className="catalog-sidebar">
        <h3 className="catalog-title">Классы</h3>
        <div className="catalog-list">
          {catalogData.map((cls, i) => (
            <div
              key={i}
              className={`catalog-item ${selectedClass === i ? 'active' : ''}`}
              onClick={() => handleClassClick(i)}
            >
              <span>{cls.className}</span>
              {/* Проверяем наличие групп */}
              {cls.groups && cls.groups.length > 0 && (
                <span className={`arrow ${selectedClass === i ? 'visible' : ''}`}>▶</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Столбец групп */}
      {selectedClass !== null && catalogData[selectedClass]?.groups && (
        <div className="catalog-sidebar">
          <h3 className="catalog-title">Группы</h3>
          <div className="catalog-list">
            {catalogData[selectedClass].groups.map((grp, j) => (
              <div
                key={j}
                className={`catalog-item ${selectedGroup === j ? 'active' : ''}`}
                onClick={() => handleGroupClick(j)}
              >
                <span>{grp.groupName}</span>
                {/* Проверяем наличие подгрупп */}
                {grp.subgroups && grp.subgroups.length > 0 && (
                  <span className={`arrow ${selectedGroup === j ? 'visible' : ''}`}>▶</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Столбец подгрупп */}
      {selectedGroup !== null &&
       catalogData[selectedClass]?.groups?.[selectedGroup]?.subgroups && (
        <div className="catalog-sidebar">
          <h3 className="catalog-title">Подгруппы</h3>
          <div className="catalog-list">
            {catalogData[selectedClass].groups[selectedGroup].subgroups.map((sub, k) => (
              <div key={k}>
                <div
                  className={`catalog-item ${expandedSubgroup === k ? 'active' : ''}`}
                  onClick={() => handleSubgroupClick(k)}
                >
                  <span>{sub.name}</span>
                  {/* Проверяем наличие дополнительной классификации */}
                  {sub.classification && sub.classification.length > 0 && (
                    <span className={`arrow ${expandedSubgroup === k ? 'visible' : ''}`}>▶</span>
                  )}
                </div>
                {/* Вложенные классификации */}
                {expandedSubgroup === k && sub.classification && (
                  <div className="powers-list">
                    {sub.classification.map((power, p) => (
                      <div key={p} className="power-item">
                        {power}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Отображение списка элементов */}
      {components.length > 0 && (
        <div className="components-list">
          <h3 className="catalog-title">Элементы</h3>
          <ul>
            {components.map((component) => (
              <li
                key={component.id}
                className="component-item"
                onClick={() => navigate(`/component/${component.id}`)} // Перенаправление на страницу компонента
              >
                {component.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}