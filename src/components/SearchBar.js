import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsDropdownVisible(false);
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
          setNoResultsMessage(true);
          setIsDropdownVisible(false);
        } else {
          setResults(data.slice(0, 10));
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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && results.length > 0 && query.trim()) {
      navigate(`/component/${results[0].id}`);
      setQuery('');
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
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
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
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
                navigate(`/component/${item.id}`);
                setQuery('');
                setIsDropdownVisible(false);
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