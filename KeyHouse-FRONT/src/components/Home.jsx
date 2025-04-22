import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import logo from "../images/Logo.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [casas, setCasas] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  // Efecto para establecer el link activo basado en la ruta actual
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Cargar los datos desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/api/casas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Casas recibidas:", data);
        setCasas(data);
      })
      .catch((error) => console.error("Error al obtener casas:", error));
  }, []);

  // Función para el efecto ripple
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <div className="home-container">
      {/* Barra de navegación mejorada */}
      

      {/* Contenido principal */}
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
                    {/* Botón de redirección */}
                    <Link to={`/casa/${casa.id}`} className="ver-detalles-btn">
                      Ver detalles
                    </Link>
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

export default Home;