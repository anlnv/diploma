/*import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useState } from 'react';
import './logout.css';

function Header(props) {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  let hideTimeout = null;

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    setShowSettings(true);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setShowSettings(false);
    }, 2000);
  };

  const handleSearchClick = () => {
    navigate('/users');
  };

  return (
    <header className="header">
      <img className="header__logo" alt="header__logo" src={logo} />
      <p className="header__name">GameNet</p>
      <div className="header__links">
        <Link to="/home" className="header__link">Home</Link>
        <Link to="/finder" className="header__link">Finder</Link>
      </div>
      <nav className="navbar">
        <button className="navbar__icon navbar__icon_search" onClick={handleSearchClick}></button>
        <button className="navbar__icon navbar__icon_notifications"></button>
        <div
          className="navbar__icon navbar__icon_settings"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showSettings && (
            <div className="settings-popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link to="/profile-settings" className="settings-popup__item">Profile Settings</Link>
              <Link to="/survey" className="settings-popup__item">Recommendation Survey</Link>
              <button className="settings-popup__item settings-popup__logout" onClick={props.onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;*/

import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      {/* Левая часть: Логотип и название */}
      <div className="header-left">
        <Link to="/" className="header-logo">
          {/* Логотип (замените src на путь к вашему логотипу) */}
          <img
            src={logo} // Убедитесь, что путь к логотипу правильный
            alt="Логотип"
            className="header-logo-img"
          />
        </Link>
        <h1 className="header-title">ElectroBase</h1> {/* Название приложения */}
      </div>

      {/* Правая часть: Ссылки и кнопки */}
      <div className="header-right">
        <Link to="/catalog" className="header-link">
          Каталог
        </Link>
        <Link to="/catalog" className="header-link">
          Заявки
        </Link>
        <Link to="/settings" className="header-link">
          Настройки
        </Link>
        <button className="header-button" onClick={props.onLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;