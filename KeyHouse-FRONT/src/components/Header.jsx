import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import logo from "../images/keyhouse_remove_background.png"; // Ruta relativa corregida
import lupaIcon from "../images/loupe.png";

const Header = () => {
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar búsqueda guardada en localStorage al iniciar
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) {
      setSearch(savedSearch);
    }
  }, []);

  // Cargar datos del usuario
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
  }, []);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem('searchTerm', value);
    
    // Si estamos en la página principal, no necesitamos navegar
    if (location.pathname !== '/home') {
      navigate('/home');
    }
  };

  // Manejar búsqueda al presionar Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      localStorage.setItem('searchTerm', search);
      
      // Asegurarse de que estamos en la página principal para ver los resultados
      if (location.pathname !== '/home') {
        navigate('/home');
      }
    }
  };

  // Borrar la búsqueda
  const clearSearch = () => {
    setSearch('');
    localStorage.removeItem('searchTerm');
  };

  // Mejorar manejo de logout con useCallback para evitar recreaciones innecesarias
  const handleLogout = useCallback(() => {
    // Ya no es necesario limpiar blobs ya que ahora usamos data URLs
    
    // Limpiar los datos de sesión al cerrar sesión
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('searchTerm');
    
    // Limpiar estados locales
    setUserAvatar('');
    setUserName('');
    setSearch('');
    
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
    <header className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="KeyHouse Logo" className="navbar-logo" />
        <span className="logo-text">Keyhouse</span>
      </div>

      {/* Barra de búsqueda estilo Airbnb */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar por título o ubicación..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        {search && (
          <button className="clear-search" onClick={clearSearch}>
            <span className="clear-icon">×</span>
          </button>
        )}
        <button className="search-button" onClick={() => navigate('/home')}>
          <img 
              src={lupaIcon}
              alt="Icono de búsqueda" 
              className="search-icon"  // Clase para estilos (opcional)
              width="22"  // Tamaño deseado
              height="22"
            />
        </button>
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
  );
};

export default Header;
