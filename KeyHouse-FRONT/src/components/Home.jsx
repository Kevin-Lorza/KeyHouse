import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import logo from "../images/Logo.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [casas, setCasas] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  // Efecto para establecer el link activo basado en la ruta actual
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Cargar los datos desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data);
        setCasas(data);
      })
      .catch((error) => console.error("Error al obtener casas:", error));
  }, []);

  // Función para el efecto ripple
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <div className="home-container">
      {/* Barra de navegación mejorada */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar propiedades..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="search-icon">🔍</i>
        </div>
        
        <div className="navbar-items">
          <Link 
            to="/favoritos" 
            className={`nav-link ${activeLink === "/favoritos" ? "active" : ""}`}
            onClick={createRipple}
          >
            <span className="link-text">Favoritos</span>
          </Link>
          
          <Link 
            to="/RegistrarCasa" 
            className={`nav-link ${activeLink === "/RegistrarCasa" ? "active" : ""}`}
            onClick={createRipple}
          >
            <span className="link-text">Publicar Vivienda</span>
          </Link>
          
          <Link 
            to="/perfil" 
            className={`nav-link ${activeLink === "/perfil" ? "active" : ""}`}
            onClick={createRipple}
          >
            <span className="link-text">Perfil</span>
          </Link>
          
          <Link 
            to="/" 
            className="nav-link logout"
            onClick={createRipple}
          >
            <span className="link-text">Cerrar Sesión</span>
          </Link>
        </div>
      </nav>

      {/* Contenido principal */}
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
                    <h3 className="casa-title">{casa.titulo}</h3>
                    <p className="casa-price">${casa.precio.toLocaleString()}</p>
                    <button className="view-details-btn">Ver detalles</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>No hay propiedades disponibles en este momento.</p>
              <Link to="/RegistrarCasa" className="add-property-link">
                ¿Quieres publicar una propiedad?
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;