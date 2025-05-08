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

/*import React, { useState } from 'react';
import './catalog.css';
import { catalogData } from './catalogData';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expandedSubgroup, setExpandedSubgroup] = useState(null);
  const [components, setComponents] = useState([]); 

 
  const fetchComponents = async (classificationName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://213.171.29.113:5000/catalog/${classificationName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComponents(data);
        console.log(data)
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

    const classificationName = catalogData[clsIndex].className;
    if (!catalogData[clsIndex].groups || catalogData[clsIndex].groups.length === 0) {
      fetchComponents(classificationName);
    }
  };

  
  const handleGroupClick = (grpIndex) => {
    setSelectedGroup(grpIndex);
    setExpandedSubgroup(null);
    setComponents([]);

    const classificationName = catalogData[selectedClass].groups[grpIndex].groupName;
    if (
      !catalogData[selectedClass].groups[grpIndex].subgroups ||
      catalogData[selectedClass].groups[grpIndex].subgroups.length === 0
    ) {
      fetchComponents(classificationName);
  };

 
  const handleSubgroupClick = (subIndex) => {
    setExpandedSubgroup(subIndex);
    setComponents([]);

    const classificationName = catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].name;
    if (
      !catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].classification ||
      catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex].classification.length === 0
    ) {
      fetchComponents(classificationName);
    }
  };

  return (
    <div className="catalog-container">
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
      {components.length > 0 && (
        <div className="components-list">
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
}*/

import React, { useState } from 'react';
import './catalog.css';
import { catalogData } from './catalogData';
import { useNavigate } from 'react-router-dom';

// Проверка: является ли classification конечным уровнем (нет вложенных объектов)
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

  const fetchComponents = async (classificationName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://213.171.29.113:5000/catalog/${classificationName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComponents(data);
        console.log(data);
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
      fetchComponents(classItem.className);
    }
  };

  const handleGroupClick = (grpIndex) => {
    setSelectedGroup(grpIndex);
    setExpandedSubgroup(null);
    setComponents([]);

    const groupItem = catalogData[selectedClass].groups[grpIndex];
    if (!groupItem.subgroups || groupItem.subgroups.length === 0) {
      fetchComponents(groupItem.groupName);
    }
  };

  const handleSubgroupClick = (subIndex) => {
    setExpandedSubgroup(subIndex);
    setComponents([]);

    const subgroupItem = catalogData[selectedClass].groups[selectedGroup].subgroups[subIndex];
    if (!subgroupItem.classification || subgroupItem.classification.length === 0) {
      fetchComponents(subgroupItem.name);
    }
  };

  return (
    <div className="catalog-container">
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
                                fetchComponents(label);
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

      {components.length > 0 && (
        <div className="components-list">
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
