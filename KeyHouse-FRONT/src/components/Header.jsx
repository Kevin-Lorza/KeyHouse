import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../images/keyhouse_remove_background.png"; // Ruta relativa corregida

const Header = () => {
  const [search, setSearch] = useState("");
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data);
        setCasas(data);
      })
      .catch((error) => console.error("Error al obtener casas:", error));
  }, []);

  return (
    <div>
      {/* Barra de navegación mejorada */}
      <header className="navbar">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="KeyHouse Logo" className="navbar-logo" />
          <span className="logo-text">Keyhouse</span>
        </div>

        {/* Barra de búsqueda (opcional) */}
        <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
        />
        </div>

        {/* Items de navegación */}
        <nav className="navbar-items">
          <Link to="/favoritos" className="nav-item">
            Favoritos
          </Link>
          <Link to="/RegistrarCasa" className="nav-item">
            Publicar vivienda 
          </Link>
          <Link to="/perfil" className="nav-item">
            Perfil
          </Link>
          <Link to="/" className="nav-item logout-btn">
            Cerrar Sesión
          </Link>
        </nav>
      </header>

      {/* Contenido principal con margen superior */}
      <main className="main-content">
        <div className="casas-container">
          {casas.length > 0 ? (
            casas.map((casa) => {
              let imagenes = [];
              try {
                imagenes = JSON.parse(casa.imagen);
              } catch (error) {
                console.error("Error al parsear imágenes:", error);
              }

              return (
                <div key={casa.id} className="casa-card">
                  {imagenes.length > 0 && (
                    <img
                      src={`http://localhost:4000/${imagenes[0]}`}
                      alt={casa.titulo}
                      className="casa-image"
                    />
                  )}
                  <div className="casa-info">
                    <h3>{casa.titulo}</h3>
                    <p>Precio: ${casa.precio.toLocaleString()}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-results">No hay casas registradas.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Header;
