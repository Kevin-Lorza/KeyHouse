import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "/home/samth0/Documentos/U/2025-I/ds-ii/KeyHouse/KeyHouse-FRONT/src/images/keyhouse_remove_background.png"; // Logo

const Header = () => {
  const [search, setSearch] = useState(""); // Estado para la barra de búsqueda
  const [casas, setCasas] = useState([]); // Estado para almacenar las casas

  // Cargar los datos desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data); // Verificar datos en la consola
        setCasas(data);
      })
      .catch((error) => console.error("Error al obtener casas:", error));
  }, []);

  return (
    <div>
      {/* Barra de navegación */}
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
        />
        <div className="navbar-items">
          <div className="dropdown"></div>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/RegistrarCasa">Publicar Vivienda</Link>
          <Link to="/">Cerrar Sesión</Link>
          <Link to="/perfil">Perfil</Link>
        </div>
      </div>
      {/* Mostrar las casas registradas */}
      <div className="casas-container">
        {casas.length > 0 ? (
          casas.map((casa) => {
            let imagenes = [];
            try {
              imagenes = JSON.parse(casa.imagen); // Convierte la cadena en array
            } catch (error) {
              console.error("Error al parsear imágenes:", error);
            }

            return (
              <div key={casa.id} className="casa-card">
                {imagenes.length > 0 && (
                  <img
                    src={`http://localhost:4000/${imagenes[0]}`}
                    alt={casa.titulo}
                  />
                )}
                <h3>{casa.titulo}</h3>
                <p>Precio: ${casa.precio}</p>
              </div>
            );
          })
        ) : (
          <p>No hay casas registradas.</p>
        )}
      </div>
    </div>
  );
};
export default Header;
