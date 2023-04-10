import logoMesto from "../images/logo_Mesto.svg";
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ loggedIn, email, onLoggin, link }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    onLoggin(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoMesto}
        alt="Логотип Место"
      />
      {
        loggedIn
          ? (
            <div className="header__container">
              <p className="header__email">
                {email}
              </p>
              <button
                type="button"
                className="header__link"
                onClick={signOut}
              >
                Выйти
              </button>
            </div>
          )
          : (
            <Link
              to={link === 'Войти' ? "/sign-in" : "/sign-up"}
              className="header__enter"
            >
              {link}
            </Link>
          )
      }
    </header>
  );
}