import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Favoritos.css";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const usuario_id = localStorage.getItem('usuario_id');

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/favoritos/${usuario_id}`);
        setFavoritos(response.data);
      } catch (error) {
        console.error('Error al obtener los favoritos', error);
        setMensaje('No se pudieron cargar los favoritos.');
      }
    };

    if (usuario_id) {
      obtenerFavoritos();
    }
  }, [usuario_id]);

  if (mensaje) return <p>{mensaje}</p>;

  return (
    <div className="favoritos-container">
      <h2>Favoritos</h2>
      {favoritos.length > 0 ? (
        <div className="cards-container">
          {favoritos.map((casa) => {
            let imagenes = [];

            try {
              imagenes = typeof casa.imagen === 'string' ? JSON.parse(casa.imagen) : casa.imagen;
            } catch (error) {
              console.error("Error al parsear imagen:", error);
            }

            return (
              <div key={casa.id} className="card">
                {imagenes.length > 0 && (
                  <img
                    src={`http://localhost:4000/${imagenes[0]}`}
                    alt="Imagen de la casa"
                    className="card-img"
                  />
                )}
                <div className="card-title">{casa.titulo}</div>
                <div className="card-precio">Precio: ${parseFloat(casa.precio).toFixed(2)}</div>
                <Link to={`/casa/${casa.id}`} className="card-link">Ver detalles</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No tienes casas favoritas.</p>
      )}
    </div>
  );
};

export default Favoritos;
