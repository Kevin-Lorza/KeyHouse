import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../images/Logo.png'; // Logo

const Home = () => {
    const [search, setSearch] = useState(''); // Estado para la barra de búsqueda


    // Cargar los datos desde el backend
   
    return (
        <div>
            {/* Barra de navegación */}
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="navbar-items">
                    <Link to="/">Cerrar Sesión</Link>
                    <div className="dropdown"></div>
                    <Link to="/favoritos">Favoritos</Link>
                    <Link to="/RegistrarCasa">Publicar Vivienda</Link>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
                    />
                    <Link to="/perfil">Perfil</Link>
                </div>
            </div>

            
        </div>
    );
};
export default Home;
