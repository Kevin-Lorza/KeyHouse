import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import RegistrarCasa from './components/RegistrarCasa'; // Importar la nueva página
import Layout from './components/Layout';
import DetalleCasa from './components/DetalleCasa';
import Favoritos from './components/Favoritos'; // Importar la nueva página de favoritos

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para las páginas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Ruta para el contenido dentro del Layout, como Home y Favoritos */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/Favoritos" element={<Favoritos />} />
        </Route>

        {/* Ruta para los detalles de la casa */}
        <Route path="/casa/:id" element={<DetalleCasa />} />
        <Route path="/RegistrarCasa" element={<RegistrarCasa />} />
      </Routes>
    </Router>
  );
}

export default App;
