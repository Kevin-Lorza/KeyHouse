import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App'; // Importa el componente principal de la aplicación

// Crea el punto de entrada para renderizar React en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente principal App dentro del contenedor 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra un Service Worker para habilitar la funcionalidad PWA