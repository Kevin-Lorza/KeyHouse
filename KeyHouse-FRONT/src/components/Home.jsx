import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [casas, setCasas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener favoritos
  const verificarFavoritos = async () => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) return;

    try {
      const response = await axios.get(`http://localhost:4000/api/favoritos/${usuario_id}`);
      setFavoritos(response.data);
    } catch (error) {
      console.error("Error al verificar favoritos:", error);
    }
  };

  // Obtener casas
  useEffect(() => {
    const fetchCasas = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/casas");
        setCasas(response.data);
        await verificarFavoritos();
      } catch (error) {
        console.error("Error al cargar casas:", error);
        setMensaje("Error al cargar casas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCasas();
  }, []);

  // Obtener búsqueda de localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const currentSearchTerm = localStorage.getItem("searchTerm") || "";
      setSearchTerm(currentSearchTerm);
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 300);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleAgregarFavorito = async (casa_id) => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      setMensaje("Debes iniciar sesión para agregar a favoritos.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/favoritos/agregar", {
        usuario_id,
        casa_id,
      });
      await verificarFavoritos();
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const handleEliminarFavorito = async (casa_id) => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      setMensaje("Debes iniciar sesión.");
      return;
    }

    try {
      await axios.delete("http://localhost:4000/api/favoritos/eliminar", {
        data: { usuario_id, casa_id },
      });
      await verificarFavoritos();
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  const esFavorito = (casa_id) => {
    return favoritos.some(fav => parseInt(fav.casa_id) === casa_id);
  };

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
                        className={`favorite-button ${esFavorito(casa.id) ? "is-favorite" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          esFavorito(casa.id)
                            ? handleEliminarFavorito(casa.id)
                            : handleAgregarFavorito(casa.id);
                        }}
                      >
                        {esFavorito(casa.id) ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="casa-info">
                      <h3 className="casa-title">{casa.titulo}</h3>
                      <p className="casa-ubicacion">{casa.ubicacion}</p>
                      <p className="casa-price">${casa.precio.toLocaleString()}</p>
                      <Link to={`/casa/${casa.id}`}>
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
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
      {mensaje && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{mensaje}</p>}
    </div>
  );
};

export default Home;
