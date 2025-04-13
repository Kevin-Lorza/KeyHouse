import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import logo from "../images/keyhouse_remove_background.png"; // Ruta relativa corregida

const Header = () => {
  const [search, setSearch] = useState("");
  const [casas, setCasas] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.nombre);
      } catch (error) {
        console.error("Error al procesar datos del usuario:", error);
      }
    }
    
    // Cargar avatar del usuario si existe
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      // Validar que el avatar sea una URL de datos válida
      if (storedAvatar.startsWith('data:image/')) {
        setUserAvatar(storedAvatar);
      } else {
        console.warn("Formato de avatar no válido, omitiendo carga de imagen");
        localStorage.removeItem('userAvatar'); // Limpiar datos inválidos
      }
    }

    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data);
        setCasas(data);
      })
      .catch((error) => console.error("Error al obtener casas:", error));
  }, []);

  // Mejorar manejo de logout con useCallback para evitar recreaciones innecesarias
  const handleLogout = useCallback(() => {
    // Ya no es necesario limpiar blobs ya que ahora usamos data URLs
    
    // Limpiar los datos de sesión al cerrar sesión
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userAvatar');
    
    // Limpiar estados locales
    setUserAvatar('');
    setUserName('');
    
    navigate('/');
  }, [navigate]);

  // Efecto para limpiar memoria al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpieza al desmontar
      console.log("Componente Header desmontado, limpiando recursos");
    };
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
          <Link to="/perfil" className="nav-item user-profile">
            {userAvatar && userAvatar.startsWith('data:image/') ? (
              <div className="user-avatar">
                <img src={userAvatar} alt="Avatar" />
              </div>
            ) : (
              <div className="user-avatar user-avatar-default">
                <span>{userName ? userName.charAt(0).toUpperCase() : "P"}</span>
              </div>
            )}
            <span className="user-name">{userName ? userName : "Perfil"}</span>
          </Link>
          <button onClick={handleLogout} className="nav-item logout-btn">
            Cerrar Sesión
          </button>
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
