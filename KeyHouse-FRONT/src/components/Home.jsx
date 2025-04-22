import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [casas, setCasas] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Cargar los datos desde el backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data);
        setCasas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener casas:", error);
        setLoading(false);
      });
  }, []);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('userFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    }
  }, []);
  
  // Escuchar cambios en el término de búsqueda desde localStorage
  useEffect(() => {
    // Función para actualizar el estado cuando cambia localStorage
    const handleStorageChange = () => {
      const currentSearchTerm = localStorage.getItem('searchTerm') || '';
      setSearchTerm(currentSearchTerm);
    };
    
    // Set initial value
    handleStorageChange();
    
    // Agregar event listener para el evento 'storage'
    window.addEventListener('storage', handleStorageChange);
    
    // También verificar cambios cada 300ms (caso de cambios en la misma ventana)
    const interval = setInterval(handleStorageChange, 300);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Verificar si una casa está en favoritos
  const isFavorite = (casaId) => {
    return favorites.some(fav => fav.id === casaId);
  };

  // Función para agregar o quitar de favoritos
  const toggleFavorite = (casa) => {
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex(fav => fav.id === casa.id);
    
    if (index >= 0) {
      // Remover de favoritos si ya existe
      newFavorites.splice(index, 1);
    } else {
      // Añadir a favoritos
      newFavorites.push(casa);
    }
    
    // Actualizar estado y localStorage
    setFavorites(newFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
  };
  
  // Filtrar casas según el término de búsqueda
  const filteredCasas = casas.filter(casa => 
    casa.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    casa.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando propiedades...</p>
        </div>
      ) : (
        <div className="casas-container">
          {filteredCasas.length > 0 ? (
            filteredCasas.map((casa) => {
              let imagenes = [];
              try {
                imagenes = JSON.parse(casa.imagen);
              } catch (error) {
                console.error("Error al parsear imágenes:", error);
              }

              return (
                <div key={casa.id} className="casa-card">
                  <div className="casa-card-inner">
                    <div className="casa-image-container">
                      {imagenes.length > 0 && (
                        <img
                          src={`http://localhost:4000/${imagenes[0]}`}
                          alt={casa.titulo}
                          className="casa-image"
                        />
                      )}
                      <button 
                        className={`favorite-button ${isFavorite(casa.id) ? 'is-favorite' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(casa);
                        }}
                      >
                        ♥
                      </button>
                    </div>
                    <div className="casa-info">
                      <h3 className="casa-title">{casa.titulo}</h3>
                      <p className="casa-ubicacion">{casa.ubicacion}</p>
                      <p className="casa-price">${casa.precio.toLocaleString()}</p>
                      <Link
                        to={`/casa/${casa.id}`}
                      >
                        <button
                          style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          Ver detalles
                        </button>
                      </Link>
                      </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>No hay propiedades disponibles con esos criterios de búsqueda.</p>
              <Link to="/RegistrarCasa" className="add-property-link">
                ¿Quieres publicar una propiedad?
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;