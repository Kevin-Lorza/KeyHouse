import React from 'react';
import "../styles/Layout.css";
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <Header /> {/* Cabecera común en todas las páginas */}

      <main className="main-content">
        <Outlet /> {/* Esto renderiza el contenido correspondiente a cada ruta */}
      </main>

      <Footer /> {/* Pie de página común en todas las páginas */}
    </div>
  );
};

export default Layout;
