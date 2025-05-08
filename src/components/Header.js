/*import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img
            src={logo} // Убедитесь, что путь к логотипу правильный
            alt="Логотип"
            className="header-logo-img"
          />
        </Link>
        <h1 className="header-title">ElectroBase</h1>
      </div>
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

export default Header;*/


import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../images/logo.svg';

function Header({ profileData, onLogout }) {
  // Проверка роли пользователя
  const isAdmin = profileData?.role === 'admin';
  const isExpert = profileData?.role === 'expert';

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
        {/* Общие ссылки */}
        <Link to="/catalog" className="header-link">
          Каталог
        </Link>
        <Link to="/myrequests" className="header-link">
          Мои заявки
        </Link>
        <Link to="/settings" className="header-link">
          Настройки
        </Link>

        {/* Ссылки только для admin */}
        {isAdmin && (
          <>
            <Link to="/admin-list" className="header-link admin-link">
              Эксперты
            </Link>
            <a
              href="http://213.171.29.113:5000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link admin-link"
            >
              Панель администратора
            </a>
          </>
        )}

        {/* Ссылки только для expert */}
        {isExpert && (
          <>
            <Link to="/requests" className="header-link expert-link">
              Все заявки
            </Link>
            <a
              href="http://213.171.29.113:5000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link expert-link"
            >
              Панель администратора
            </a>
          </>
        )}

        {/* Кнопка выхода */}
        <button className="header-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;