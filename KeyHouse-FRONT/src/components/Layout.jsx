import React from 'react';
// import { Outlet } from 'react-router-dom';
import "../styles/Layout.css";
import Header from './Header';
import Footer from './Footer';
import Home from './Home';


const Layout = () => {
  return (
    <div className="layout">
      {/* Header */}
      <Header />

      {/* Contenedor principal */}
      <main className="main-content">
        {/* <Home /> */}
      </main>

      {/* Footer */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
