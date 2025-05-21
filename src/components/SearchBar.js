// SearchBar.jsx
/*import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Функция для отправки запроса на бэкенд
  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]); // Очищаем результаты, если строка пустая
      return;
    }

    try {
      const response = await fetch(`http://213.171.29.113:5000/ec/search/?name=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.slice(0, 10)); // Ограничиваем результаты до 10 элементов
      } else {
        console.error('Ошибка при выполнении поиска:', response.statusText);
        setResults([]);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setResults([]);
    }
  };

  // Эффект для отправки запроса при изменении строки поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(query); // Вызываем функцию поиска после задержки
    }, 300);

    return () => clearTimeout(timer); // Очищаем таймер при изменении запроса
  }, [query]);

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && results.length > 0 && query.trim()) {
      navigate(`/component/${results[0].id}`); // Переходим к первому результату
      setQuery('');
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Обновляем строку поиска
        onKeyPress={handleKeyPress} // Обрабатываем нажатие Enter
        className="search-input"
        placeholder="Поиск компонентов..."
      />

      {query.length > 0 && results.length > 0 && (
        <ul className="search-results">
          {results.map((item, index) => (
            <li
              key={item.id}
              className={`search-result-item ${index === 0 ? 'active' : ''}`}
              onClick={() => {
                navigate(`/component/${item.id}`); // Переход к странице компонента
                setQuery('');
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;*/

import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Состояние видимости выпадающего списка
  const [noResultsMessage, setNoResultsMessage] = useState(false); // Флаг для сообщения "Ничего не найдено"
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Функция для отправки запроса на бэкенд
  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]); // Очищаем результаты, если строка пустая
      setIsDropdownVisible(false); // Скрываем выпадающий список
      return;
    }

    try {
      const response = await fetch(`http://213.171.29.113:5000/ec/search/?name=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length === 0) {
          // Если массив пустой, показываем сообщение "Ничего не найдено"
          setNoResultsMessage(true);
          setIsDropdownVisible(false);
        } else {
          // Иначе отображаем результаты
          setResults(data.slice(0, 10)); // Ограничиваем результаты до 10 элементов
          setIsDropdownVisible(true);
          setNoResultsMessage(false);
        }
      } else {
        console.error('Ошибка при выполнении поиска:', response.statusText);
        setResults([]);
        setIsDropdownVisible(false);
        setNoResultsMessage(false);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setResults([]);
      setIsDropdownVisible(false);
      setNoResultsMessage(false);
    }
  };

  // Эффект для отправки запроса при изменении строки поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(query); // Вызываем функцию поиска после задержки
    }, 300);

    return () => clearTimeout(timer); // Очищаем таймер при изменении запроса
  }, [query]);

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && results.length > 0 && query.trim()) {
      navigate(`/component/${results[0].id}`); // Переходим к первому результату
      setQuery('');
      setIsDropdownVisible(false); // Скрываем выпадающий список
    }
  };

  // Обработка клика вне области выпадающего списка
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Скрываем выпадающий список
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Обновляем строку поиска
        onKeyPress={handleKeyPress} // Обрабатываем нажатие Enter
        className="search-input"
        placeholder="Поиск компонентов..."
      />

      {/* Отображение сообщения "Ничего не найдено" */}
      {noResultsMessage && (
        <div className="no-results-message">
          <p>Совпадений не найдено. Данный элемент отсутствует в нашей базе данных.</p>
          <p>
            Вы можете классифицировать компонент с помощью ИИ в режиме реального времени или отправить запрос на более точную классификацию элемента эксперту в разделе{' '}
            <Link to="/myrequests" className="link">
            "Мои заявки".
            </Link>{' '}
          </p>
        </div>
      )}

      {/* Отображение результатов поиска */}
      {isDropdownVisible && results.length > 0 && (
        <ul className="search-results">
          {results.map((item, index) => (
            <li
              key={item.id}
              className={`search-result-item ${index === 0 ? 'active' : ''}`}
              onClick={() => {
                navigate(`/component/${item.id}`); // Переход к странице компонента
                setQuery('');
                setIsDropdownVisible(false); // Скрываем выпадающий список
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;