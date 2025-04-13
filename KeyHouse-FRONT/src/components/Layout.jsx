import React from 'react';
import { Outlet } from 'react-router-dom';
import "../styles/Layout.css";
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="layout">
      {/* Header */}
      <Header />

      {/* Contenedor principal */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;