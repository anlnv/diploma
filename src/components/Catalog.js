import React, { useState, useEffect, useRef } from 'react';
import './catalog.css';
import { catalogData } from './catalogData';
import { useNavigate } from 'react-router-dom';

const isLeaf = (value) => {
  if (!value) return true;
  if (typeof value !== 'object') return true;
  if (Array.isArray(value)) return value.every(isLeaf);
  return Object.values(value).every(val => typeof val !== 'object' || val === null);
};

export default function Catalog() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expandedSubgroup, setExpandedSubgroup] = useState(null);
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();

  const componentsRef = useRef(null);

  const fetchComponents = async (classificationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://213.171.29.113:5000/catalog/${classificationId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComponents(data);
      } else {
        console.error('Ошибка при получении данных:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  const handleClassClick = (clsIndex) => {
    setSelectedClass(clsIndex);
    setSelectedGroup(null);
    setExpandedSubgroup(null);
    setComponents([]);

    const classItem = catalogData[clsIndex];
    if (!classItem.groups || classItem.groups.length === 0) {
      fetchComponents(classItem.id);
    }
  };

  const handleGroupClick = (grpIndex) => {
    setSelectedGroup(grpIndex);
    setExpandedSubgroup(null);
    setComponents([]);

    const groupItem = catalogData[selectedClass].groups[grpIndex];
    if (!groupItem.subgroups || groupItem.subgroups.length === 0) {
      fetchComponents(groupItem.id);
    }
  };

  const handleSubgroupClick = (subIndex) => {
    setExpandedSubgroup(subIndex);
    setComponents([]);

    const subgroupItem = catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex];
    if (!subgroupItem.classification || subgroupItem.classification.length === 0) {
      fetchComponents(subgroupItem.id);
    }
  };

  useEffect(() => {
    if (components.length > 0 && componentsRef.current) {
      componentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [components]);

  return (
    <div className="catalog-container">
      {/* Список классов */}
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
              {cls.groups && cls.groups.length > 0 && (
                <span className={`arrow ${selectedClass === i ? 'visible' : ''}`}>▶</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Список групп */}
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
                {grp.subgroups && grp.subgroups.length > 0 && (
                  <span className={`arrow ${selectedGroup === j ? 'visible' : ''}`}>▶</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Список подгрупп */}
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
                    {sub.classification && sub.classification.length > 0 && (
                      <span className={`arrow ${expandedSubgroup === k ? 'visible' : ''}`}>▶</span>
                    )}
                  </div>
                  {expandedSubgroup === k && sub.classification && (
                    <div className="powers-list">
                      {sub.classification.map((power, p) => {
                        const canFetch = isLeaf(power);
                        const label = typeof power === 'string'
                          ? power
                          : Object.values(power).join(' / ');

                        return (
                          <div
                            key={p}
                            className="power-item"
                            style={{ cursor: canFetch ? 'pointer' : 'default' }}
                            onClick={() => {
                              if (canFetch) {
                                fetchComponents(sub.id); // Используем ID подгруппы
                              }
                            }}
                          >
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Список компонентов */}
      {components.length > 0 && (
        <div className="components-list" ref={componentsRef}>
          <h3 className="catalog-title">Элементы</h3>
          <ul>
            {components.map((component) => (
              <li
                key={component.id}
                className="component-item"
                onClick={() => navigate(`/component/${component.id}`)}
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
