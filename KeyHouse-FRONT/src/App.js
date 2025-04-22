import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import RegistrarCasa from "./components/RegistrarCasa"; // Importar la nueva página
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import DetalleCasa from './components/DetalleCasa';
import Favorites from "./components/Favorites";

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
        <Route path="/casa/:id" element={<DetalleCasa />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;