import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    // Cargar favoritos desde localStorage
    setTimeout(() => {
      const storedFavorites = localStorage.getItem('userFavorites');
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error("Error al cargar favoritos:", error);
        }
      }
      setLoading(false);
    }, 500); // Simulamos una pequeña carga para mostrar el spinner
  }, [navigate]);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter(favorite => favorite.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="header-content">
          <div className="header-icon">
            <i className="heart-icon">♥</i>
          </div>
          <div className="header-info">
            <h1>Mis Favoritos</h1>
            <p className="favorites-subtitle">
              Guarda tus propiedades favoritas para verlas más tarde
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tus favoritos...</p>
        </div>
      ) : (
        <>
          {favorites.length === 0 ? (
            <div className="no-favorites-container">
              <div className="no-favorites-icon">♥</div>
              <h2>No tienes favoritos guardados</h2>
              <p>Las propiedades que marques como favoritas aparecerán aquí</p>
              <Link to="/home" className="explore-button">
                Explorar propiedades
              </Link>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map(property => {
                let imagenes = [];
                try {
                  if (property.imagen) {
                    imagenes = JSON.parse(property.imagen);
                  }
                } catch (error) {
                  console.error("Error al parsear imágenes:", error);
                }

                return (
                  <div className="property-card" key={property.id}>
                    <div className="property-image-container">
                      {imagenes.length > 0 ? (
                        <img 
                          src={`http://localhost:4000/${imagenes[0]}`} 
                          alt={property.titulo} 
                          className="property-image" 
                        />
                      ) : (
                        <div className="property-no-image">
                          <span>Sin imagen</span>
                        </div>
                      )}
                      <button 
                        className="remove-favorite-button" 
                        onClick={() => removeFavorite(property.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="property-info">
                      <h3 className="property-title">{property.titulo}</h3>
                      <p className="property-location">{property.ubicacion}</p>
                      <p className="property-description">{property.descripcion}</p>
                      <p className="property-price">${property.precio.toLocaleString()}</p>
                      <Link to={`/property/${property.id}`} className="view-property-button">
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      
      <div className="back-link">
        <Link to="/home">← Volver a inicio</Link>
      </div>
    </div>
  );
};

export default Favorites; 