import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Asegúrate de que este Link esté importado
import "../styles/Header.css"; // Asegúrate de que los estilos se estén cargando correctamente
import logo from "../images/keyhouse_remove_background.png"; // Ruta relativa corregida

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <header className="navbar">
        <div className="logo-container">
          <img src={logo} alt="KeyHouse Logo" className="navbar-logo" />
          <span className="logo-text">Keyhouse</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <nav className="navbar-items">
          <Link to="/Favoritos" className="nav-item">
            Favoritos
          </Link>
          <Link to="/RegistrarCasa" className="nav-item">Publicar vivienda</Link>
          <Link to="/perfil" className="nav-item">Perfil</Link>
          <Link to="/" className="nav-item logout-btn">Cerrar Sesión</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
