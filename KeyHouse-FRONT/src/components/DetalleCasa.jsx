import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetalleCasa.css';
import Header from './Header';
import Footer from './Footer';
const DetalleCasa = () => {
  const { id } = useParams();
  const [casa, setCasa] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [esFavorito, setEsFavorito] = useState(false);
  const [loading, setLoading] = useState(true);

  const usuario_id = localStorage.getItem('usuario_id');

  const verificarFavorito = async () => {
    if (!usuario_id) return;

    try {
      const response = await axios.get(`http://localhost:4000/api/favoritos/${usuario_id}`);
      const favoritos = response.data;

      const esFav = favoritos.some(fav => parseInt(fav.id) === parseInt(id));
      setEsFavorito(esFav);

      console.log('Estructura de favorito:', favoritos[0]);
      console.log('¿Es favorito?', esFav, 'ID actual:', id);
    } catch (error) {
      console.error('Error al verificar favorito:', error);
    }
  };

  const fetchCasa = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/casas/${id}`);
      setCasa(response.data);
    } catch (error) {
      console.error('Error al cargar la casa:', error);
      setMensaje('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCasa();
      await verificarFavorito();
    };
    init();
  }, [id]);

  const handleAgregarFavorito = async () => {
    if (!usuario_id) return setMensaje('Debes iniciar sesión para agregar a favoritos.');

    try {
      await axios.post('http://localhost:4000/api/favoritos/agregar', {
        usuario_id,
        casa_id: id,
      });
      setMensaje('Casa agregada a favoritos');
      await verificarFavorito();
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      setMensaje('No se pudo agregar a favoritos.');
    }
  };

  const handleEliminarFavorito = async () => {
    if (!usuario_id) return setMensaje('Debes iniciar sesión.');

    try {
      await axios.delete('http://localhost:4000/api/favoritos/eliminar', {
        data: { usuario_id, casa_id: id },
      });
      setMensaje('Casa eliminada de favoritos');
      await verificarFavorito();
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      setMensaje('No se pudo eliminar de favoritos.');
    }
  };

  const handleAlquilar = async () => {
    if (!usuario_id) return setMensaje('Debes iniciar sesión para alquilar.');

    try {
      const response = await axios.post('http://localhost:4000/api/alquileres/registrar', {
        usuario_id,
        casa_id: id,
      });
      setMensaje(response.data.mensaje);
    } catch (error) {
      console.error('Error al alquilar la casa:', error);
      setMensaje('No se pudo alquilar la casa.');
    }
  };

  if (loading) return <p className="detalle-cargando">Cargando...</p>;
  if (!casa) return <p className="detalle-cargando">No se encontró la casa.</p>;

  const imagenes = typeof casa.imagen === 'string' ? JSON.parse(casa.imagen) : casa.imagen;

  return (
    <div className="detalle-container">
      <h2>{casa.titulo}</h2>

      {imagenes?.length > 0 && imagenes.map((img, index) => (
        <img
          key={index}
          src={`http://localhost:4000/${img}`}
          alt={`Imagen ${index + 1}`}
          className="detalle-imagen"
        />
      ))}

      <p><strong>Ubicación:</strong> {casa.ubicacion}</p>
      <p><strong>Descripción:</strong> {casa.descripcion}</p>
      <p><strong>Precio:</strong> ${casa.precio.toLocaleString()}</p>

      <button onClick={handleAlquilar} className="btn btn-alquilar">
        Alquilar
      </button>

      {esFavorito ? (
        <button onClick={handleEliminarFavorito} className="btn btn-eliminar">
          Eliminar de Favoritos
        </button>
      ) : (
        <button onClick={handleAgregarFavorito} className="btn btn-agregar">
          Agregar a Favoritos
        </button>
      )}

      {mensaje && <p className="detalle-mensaje">{mensaje}</p>}
    </div>
  );
};

export default DetalleCasa;
