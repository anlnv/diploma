/*import React, { useState, useEffect } from 'react';
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
      const token = localStorage.getItem('token');
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

export default Component;*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './component.css';

const Component = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Состояние для хранения введенных пользователем значений
  const [conversionInputs, setConversionInputs] = useState({});

  // Функция для получения данных с бэкенда
  const fetchComponentData = async () => {
    try {
      const token = localStorage.getItem('token');
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

  // Массив единиц измерения для перевода
  const conversionUnits = [
    { key: 'l_bsg_6_hour_cycle', unit: 'цикл/час', exponent: '×10⁶' },
    { key: 'l_bsg_6_imp', unit: 'импульс/час', exponent: '×10⁶' },
    { key: 'l_bsg_6_hour_srab', unit: 'срабатывание/час', exponent: '×10⁶' },
    { key: 'l_bsg_6_pb', unit: 'пробой/час', exponent: '×10⁶' },
    { key: 'l_bsg_6_vkl', unit: 'включение/час', exponent: '×10⁶' },
    { key: 'l_bsg_m10_hour', unit: 'λ бсг -10 час', exponent: '×10⁻¹⁰' },
    { key: 'l_bsg_m12_hour', unit: 'λ бсг -12 час', exponent: '×10⁻¹²' },
    { key: 'l_bsg_m15_hour', unit: 'λ бсг -15 час', exponent: '×10⁻¹⁵' },
  ];

  // Обработка изменений в полях ввода
  const handleInputChange = (key, value) => {
    setConversionInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Функция для форматирования чисел
  const formatNumber = (value) => {
    if (value === null || value === undefined) return '';
    const fixedValue = parseFloat(value).toFixed(10); // Фиксируем до 10 знаков после запятой для анализа
    const parts = fixedValue.split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1];

    // Если дробная часть состоит только из нулей, возвращаем целую часть
    if (/^0+$/.test(fractionalPart)) {
      return integerPart;
    }

    // Находим индекс первой ненулевой цифры в дробной части
    const firstNonZeroIndex = fractionalPart.search(/[^0]/);

    // Определяем количество знаков после запятой для отображения
    let significantDigits = 2; // Минимум 2 знака
    if (firstNonZeroIndex >= 0) {
      significantDigits = Math.max(2, firstNonZeroIndex + 2); // Показываем минимум 2 значимых цифры
    }

    // Возвращаем число с нужным количеством значимых цифр
    return parseFloat(fixedValue).toFixed(significantDigits);
  };

  // Расчет l_hsg_8_hour на основе l_bsg_6_hour
  const calculateLhsg = () => {
    // Проверяем, есть ли l_bsg_6_hour напрямую
    if (reliability.l_bsg_6_hour) {
      return parseFloat(reliability.l_bsg_6_hour) * 0.01;
    }

    // Если l_bsg_6_hour отсутствует, проверяем, был ли выполнен перевод
    for (const unit of conversionUnits) {
      if (conversionInputs[unit.key]) {
        const convertedValue = parseFloat(conversionInputs[unit.key]) * parseFloat(reliability[unit.key]);
        return convertedValue * 0.01;
      }
    }

    // Если ни одно условие не выполнено, возвращаем null
    return null;
  };

  // Рассчитанное значение l_hsg_8_hour
  const calculatedLhsg = calculateLhsg();

  // Расчет Trz
  const calculateTrz = (lambdaBsg) => {
    const reliabilityFactor = classLevel === 'Микросхемы интегральные' ? 0.99 : 0.975;
    return (1 / lambdaBsg) * Math.log(reliabilityFactor);
  };

  // Расчет Tsx
  const calculateTsx = (lambdaHsg) => {
    return (1 / lambdaHsg) * Math.log(0.99);
  };

  // Получение значения λ бсг (l_bsg_6_hour)
  const getLambdaBsg = () => {
    if (reliability.l_bsg_6_hour) {
      return parseFloat(reliability.l_bsg_6_hour);
    }

    for (const unit of conversionUnits) {
      if (conversionInputs[unit.key]) {
        return parseFloat(conversionInputs[unit.key]) * parseFloat(reliability[unit.key]);
      }
    }

    return null;
  };

  // Рассчитанное значение λ бсг
  const lambdaBsg = getLambdaBsg();

  // Рассчитанные значения Trz и Tsx
  const trz = lambdaBsg ? formatNumber(calculateTrz(lambdaBsg)) : null;
  const tsx = calculatedLhsg ? formatNumber(calculateTsx(calculatedLhsg)) : null;

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
          {/* Отображение полей для перевода единиц измерения */}
          {conversionUnits.map((unit, index) => {
            if (reliability[unit.key]) {
              const inputValue = conversionInputs[unit.key] || '';
              const convertedValue =
                inputValue && reliability[unit.key]
                  ? formatNumber(parseFloat(inputValue) * parseFloat(reliability[unit.key]))
                  : null;

              return (
                <li key={index} className="data-item">
                  <span className="label">
                    {unit.unit} × λ бсг ({reliability[unit.key]} {unit.exponent}):
                  </span>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => handleInputChange(unit.key, e.target.value)}
                    placeholder={`Введите значение (${unit.unit})`}
                  />
                  {convertedValue && (
                    <span className="value">
                      {' '}
                      = {convertedValue} {unit.exponent}
                    </span>
                  )}
                </li>
              );
            }
            return null;
          })}

          {/* Отображение λ хсг */}
          {calculatedLhsg ? (
            <li className="data-item">
              <span className="label">λ хсг:</span>
              <span className="value">{formatNumber(calculatedLhsg)}×10⁸ 1/ч</span>
            </li>
          ) : reliability.l_hsg_8_hour && (
            <li className="data-item">
              <span className="label">λ хсг:</span>
              <span className="value">{formatNumber(reliability.l_hsg_8_hour)}×10⁸ 1/ч</span>
            </li>
          )}

          {/* Отображение Ea */}
          {reliability.Ea && (
            <li className="data-item">
              <span className="label">Ea:</span>
              <span className="value">{formatNumber(reliability.Ea)} эВ</span>
            </li>
          )}

          {/* Отображение Trz */}
          {trz && (
            <li className="data-item">
              <span className="label">Trz:</span>
              <span className="value">{trz}</span>
            </li>
          )}

          {/* Отображение Tsx */}
          {tsx && (
            <li className="data-item">
              <span className="label">Tsx:</span>
              <span className="value">{tsx}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Component;