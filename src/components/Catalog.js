/*import React, { useState } from 'react';
import './catalog.css';

const catalogData = [
  {
    className: 'Оптоэлектронные полупроводниковые приборы',
    groups: [
      {
        groupName: 'Излучатели полупроводниковые',
        subgroups: [
          { name: 'Инфракрасного диапазона' },
          { name: 'Видимого диапазона' }
        ],
      },
      {
        groupName: 'Оптопары',
        subgroups: [
          { name: 'Диодные' },
          {
            name: 'Транзисторные',
            powers: ['Малой мощности', 'Средней мощности', 'Большой мощности'],
          },
          { name: 'Резисторные' },
        ],
      },
    ],
  },
];

function Catalog() {
  const [activeClass, setActiveClass] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeSubgroup, setActiveSubgroup] = useState(null);

  return (
    <div className="catalog">
      <ul className="catalog__classes">
        {catalogData.map((cls, ci) => (
          <li
            key={ci}
            className="catalog__item catalog__item--class"
            onMouseEnter={() => setActiveClass(ci)}
            onMouseLeave={() => {
              setActiveClass(null);
              setActiveGroup(null);
              setActiveSubgroup(null);
            }}
          >
            {cls.className}
            {activeClass === ci && (
              <ul className="catalog__groups">
                {cls.groups.map((grp, gi) => (
                  <li
                    key={gi}
                    className="catalog__item catalog__item--group"
                    onMouseEnter={() => setActiveGroup(gi)}
                    onMouseLeave={() => {
                      setActiveGroup(null);
                      setActiveSubgroup(null);
                    }}
                  >
                    {grp.groupName}
                    {activeGroup === gi && (
                      <ul className="catalog__subgroups">
                        {grp.subgroups.map((sub, si) => (
                          <li
                            key={si}
                            className="catalog__item catalog__item--subgroup"
                            onMouseEnter={() => sub.powers && setActiveSubgroup(si)}
                            onMouseLeave={() => setActiveSubgroup(null)}
                          >
                            {sub.name}
                            {activeSubgroup === si && sub.powers && (
                              <ul className="catalog__powers">
                                {sub.powers.map((p, pi) => (
                                  <li
                                    key={pi}
                                    className="catalog__item catalog__item--power"
                                  >
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalog;*/


import React, { useState } from 'react';
import './catalog.css';

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

export default function Catalog() {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expandedSubgroup, setExpandedSubgroup] = useState(null);
  
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
                onClick={() => {
                  setSelectedClass(i);
                  setSelectedGroup(null);
                  setExpandedSubgroup(null);
                }}
              >
                <span>{cls.className}</span>
                <span className={`arrow ${selectedClass === i ? 'visible' : ''}`}>▶</span>
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
                  onClick={() => {
                    setSelectedGroup(j);
                    setExpandedSubgroup(null);
                  }}
                >
                  <span>{grp.groupName}</span>
                  <span className={`arrow ${selectedGroup === j ? 'visible' : ''}`}>▶</span>
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
                    onClick={() => {
                      if (sub.classification) {
                        setExpandedSubgroup(expandedSubgroup === k ? null : k);
                      }
                    }}
                  >
                    <span>{sub.name}</span>
                    <span className={`arrow ${expandedSubgroup === k ? 'visible' : ''}`}>
                      {sub.classification ? '▶' : ''}
                    </span>
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
      </div>
    );
  }