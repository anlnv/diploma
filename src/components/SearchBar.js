// SearchBar.jsx
import { useState, useEffect, useRef, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import './SearchBar.css';

const SearchBar = ({ components }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const fuse = useMemo(() => 
    new Fuse(components, { 
      keys: ['name'],
      threshold: 0.3,
      minMatchCharLength: 1
    }), 
  [components]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 1) {
        const searchResults = fuse.search(query);
        setResults(searchResults.slice(0, 10));
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, fuse]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && results.length > 0 && query.trim()) {
      navigate(`/component/${results[0].item.id}`);
      setQuery('');
    }
  };

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
      
      {query.length > 0 && results.length > 0 && (
        <ul className="search-results">
          {results.map(({ item }, index) => (
            <li
              key={item.id}
              className={`search-result-item ${index === 0 ? 'active' : ''}`}
              onClick={() => {
                navigate(`/component/${item.id}`);
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

export default SearchBar;