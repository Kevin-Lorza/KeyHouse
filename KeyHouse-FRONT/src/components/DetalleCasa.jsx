import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetalleCasa = () => {
  const { id } = useParams(); 
  const [casa, setCasa] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [esFavorito, setEsFavorito] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  // Función para obtener los favoritos y verificar si la casa actual es favorita
  const verificarFavorito = async () => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/favoritos/${usuario_id}`);
      const favoritosData = response.data;
      setFavoritos(favoritosData);
      
      // Mostrar la estructura exacta del primer elemento para debug
      console.log('Estructura de datos de favorito:', 
        favoritosData.length > 0 ? JSON.stringify(favoritosData[0]) : 'No hay favoritos');
      
      // Comparar con el ID directamente, ya que el backend devuelve objetos casa completos
      const casa_id_num = parseInt(id);
      
      // La consulta SQL devuelve casas completas, por lo que debemos comparar con el ID de la casa
      const encontrado = favoritosData.some(fav => parseInt(fav.id) === casa_id_num);
      
      console.log('¿Es favorito?', encontrado, 'ID actual:', casa_id_num);
      setEsFavorito(encontrado);
    } catch (error) {
      console.error('Error al verificar favorito:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los datos iniciales
  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      try {
        // Obtener datos de la casa
        const responseCasa = await axios.get(`http://localhost:4000/api/casas/${id}`);
        setCasa(responseCasa.data);
        
        // Verificar si es favorito
        await verificarFavorito();
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setMensaje('Error al cargar los datos.');
      }
    };

    fetchData();
  }, [id]);

  // Agregar a favoritos
  const handleAgregarFavorito = async () => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setMensaje('Debes iniciar sesión para agregar a favoritos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/favoritos/agregar', {
        usuario_id,
        casa_id: id,
      });
      console.log('Respuesta al agregar favorito:', response.data);
      setMensaje('Casa agregada a favoritos');
      
      // Volver a verificar favoritos para asegurar consistencia
      await verificarFavorito();
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      setMensaje('No se pudo agregar a favoritos.');
    }
  };

  // Eliminar de favoritos
  const handleEliminarFavorito = async () => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setMensaje('Debes iniciar sesión.');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:4000/api/favoritos/eliminar', {
        data: { usuario_id, casa_id: id },
      });
      console.log('Respuesta al eliminar favorito:', response.data);
      setMensaje('Casa eliminada de favoritos');
      
      // Volver a verificar favoritos para asegurar consistencia
      await verificarFavorito();
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      setMensaje('No se pudo eliminar de favoritos.');
    }
  };

  const handleAlquilar = async () => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      setMensaje('Debes iniciar sesión para alquilar.');
      return;
    }

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

  if (loading) return <p style={{ padding: '20px' }}>Cargando...</p>;
  if (!casa) return <p style={{ padding: '20px' }}>No se encontró la casa</p>;

  const imagenes = typeof casa.imagen === 'string' ? JSON.parse(casa.imagen) : casa.imagen;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{casa.titulo}</h2>

      {imagenes && imagenes.length > 0 && imagenes.map((img, index) => (
        <img
          key={index}
          src={`http://localhost:4000/${img}`}
          alt={`Imagen ${index + 1}`}
          style={{ width: '300px', borderRadius: '8px', marginBottom: '10px', display: 'block' }}
        />
      ))}

      <p><strong>Ubicación:</strong> {casa.ubicacion}</p>
      <p><strong>Descripción:</strong> {casa.descripcion}</p>
      <p><strong>Precio:</strong> ${casa.precio}</p>

      <button onClick={handleAlquilar} style={{ marginTop: '10px' }}>
        Alquilar
      </button>

      {esFavorito ? (
        <button onClick={handleEliminarFavorito} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
          Eliminar de Favoritos
        </button>
      ) : (
        <button onClick={handleAgregarFavorito} style={{ marginTop: '10px' }}>
          Agregar a Favoritos
        </button>
      )}

      {mensaje && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{mensaje}</p>}
    </div>
  );
};

export default DetalleCasa;
