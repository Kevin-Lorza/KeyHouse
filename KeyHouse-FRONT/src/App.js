import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import RegistrarCasa from "./components/RegistrarCasa"; // Importar la nueva página
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import SobreNosotros from "./components/SobreNosotros";
import DetalleCasa  from "./components/DetalleCasa";
import MisPropiedades from './components/MisPropiedades';
import EditarPropiedad from './components/EditarPropiedad';
import PublicarPropiedad from './components/PublicarPropiedad';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/RegistrarCasa" element={<RegistrarCasa />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Layout />}>
          <Route path="/sobre" element={<SobreNosotros />} />
          <Route path="/casa/:id" element={<DetalleCasa />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/mis-propiedades" element={<MisPropiedades />} />
        <Route path="/editar-propiedad/:id" element={<EditarPropiedad />} />
        <Route path="/publicar-propiedad" element={<PublicarPropiedad />} />
      </Routes>
    </Router>
  );
}

export default App;