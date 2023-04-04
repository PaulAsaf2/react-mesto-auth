import logoMesto from "../images/logo_Mesto.svg";
import React from "react";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoMesto} alt="Логотип Место" />
    </header>
  );
}

export default Header;
