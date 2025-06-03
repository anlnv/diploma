import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../images/logo.svg';

function Header({ profileData, onLogout }) {
  const isAdmin = profileData?.role === 'admin';
  const isExpert = profileData?.role === 'expert';

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/catalog" className="header-logo">
          <img
            src={logo}
            alt="Логотип"
            className="header-logo-img"
          />
        </Link>
        <Link to="/catalog" className="header-title">ElectroBase</Link>
      </div>

      <div className="header-right">
        <Link to="/catalog" className="header-link">
          Каталог
        </Link>
        <Link to="/myrequests" className="header-link">
          Мои заявки
        </Link>
        <Link to="/settings" className="header-link">
          Настройки
        </Link>

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

        <button className="header-button" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;