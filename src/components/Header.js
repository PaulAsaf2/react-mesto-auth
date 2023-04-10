import logoMesto from "../images/logo_Mesto.svg";
import React, { useState } from "react";
import Media from "react-media";
import { Link, useNavigate } from 'react-router-dom';
import MenuButton from './MenuButton';

export default function Header({ loggedIn, email, onLoggin, link }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  };

  function signOut() {
    localStorage.removeItem('token');
    onLoggin(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <Media query={{ maxWidth: 500 }}>
      {matches =>
        matches ? (
          <header className="header">
            {
              menuOpen ?
                <>
                  <p className={`header__email ${menuOpen ? 'header__email_open' : ''}`}>
                    {email}
                  </p>
                  <button
                    type="button"
                    className="header__link"
                    onClick={signOut}
                  >
                    Выйти
                  </button>
                </>
                : null
            }
            <div className={`header__container ${menuOpen ? 'header__container_open' : ''}`}>
              <img
                className="header__logo"
                src={logoMesto}
                alt="Логотип Место"
              />
              {
                loggedIn ? (
                  <MenuButton
                    open={menuOpen}
                    onClick={handleMenuClick}
                  />
                ) : (
                  <Link
                    to={link === 'Войти' ? "/sign-in" : "/sign-up"}
                    className="header__enter"
                  >
                    {link}
                  </Link>
                )
              }
            </div>
          </header>
        ) : (
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
        )
      }
    </Media>
  );
}