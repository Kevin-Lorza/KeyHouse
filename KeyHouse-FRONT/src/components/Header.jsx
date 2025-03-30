import React from 'react';
import "../styles/Header.css";
import logo from "/home/samth0/Documentos/U/2025-I/ds-ii/KeyHouse/KeyHouse-FRONT/src/images/Logo-removebg-preview.png"; // Logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-links">
        <a href="/home">Inicio</a>
        <a href="/favorites">Favoritos</a>
        <a href="/profile">Perfil</a>
        <a href="/logout">Cerrar Sesión</a>
      </nav>
    </header>
  );
};

export default Header;
