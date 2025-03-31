import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import RegistrarCasa from "./components/RegistrarCasa"; // Importar la nueva página
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/RegistrarCasa" element={<RegistrarCasa />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;