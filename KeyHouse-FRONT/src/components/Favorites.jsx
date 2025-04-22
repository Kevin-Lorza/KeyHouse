import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    } else {
      cargarFavoritos();
    }
  }, []);

  const cargarFavoritos = async () => {
    setLoading(true);
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:4000/api/favoritos/${usuario_id}`);
      setFavorites(data);
      localStorage.setItem('userFavorites', JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      const cached = localStorage.getItem('userFavorites');
      if (cached) {
        setFavorites(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarFavorito = async (casa_id) => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setMensaje('Debes iniciar sesión.');
      return;
    }

    try {
      await axios.delete('http://localhost:4000/api/favoritos/eliminar', {
        data: { usuario_id, casa_id }
      });

      const actualizados = favorites.filter(fav => fav.id !== casa_id);
      setFavorites(actualizados);
      localStorage.setItem('userFavorites', JSON.stringify(actualizados));
      setMensaje('Propiedad eliminada de favoritos.');
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      setMensaje('Error al eliminar de favoritos.');
    }
  };

  return (
    <div className="favorites-container">
      {mensaje && <div className="mensaje-alerta">{mensaje}</div>}
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
      ) : favorites.length === 0 ? (
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
          {favorites.map((casa) => {
            let imagenes = [];
            try {
              if (casa.imagen) {
                imagenes = JSON.parse(casa.imagen);
              }
            } catch (err) {
              console.error("Error al parsear imágenes:", err);
            }

            return (
              <div className="property-card" key={casa.id}>
                <div className="property-image-container">
                  {imagenes.length > 0 ? (
                    <img
                      src={`http://localhost:4000/${imagenes[0]}`}
                      alt={casa.titulo}
                      className="property-image"
                    />
                  ) : (
                    <div className="property-no-image">
                      <span>Sin imagen</span>
                    </div>
                  )}
                  <button
                    className="remove-favorite-button"
                    onClick={() => handleEliminarFavorito(casa.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="property-info">
                  <h3 className="property-title">{casa.titulo}</h3>
                  <p className="property-location">{casa.ubicacion}</p>
                  <p className="property-description">{casa.descripcion}</p>
                  <p className="property-price">${casa.precio.toLocaleString()}</p>
                  <Link to={`/casa/${casa.id}`}>
                    <button className="ver-detalles-btn">Ver detalles</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="back-link">
        <Link to="/home">← Volver a inicio</Link>
      </div>
    </div>
  );
};

export default Favorites;
