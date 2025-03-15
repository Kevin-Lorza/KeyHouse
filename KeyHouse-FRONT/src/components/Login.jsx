import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';
import book2 from '../images/book.image.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  // Función que se ejecuta cuando se hace clic en "Iniciar Sesión"
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      console.log(data); // Verifica la estructura de la respuesta
  
      // Accede al array de usuarios a través de data.body
      const userArray = data.body || []; 
      const user = userArray.find(user => user.email === email && user.contraseña === password);
  
      if (user) {
        navigate('/home'); // Redirigir a la página de inicio
      } else {
        setError('Usuario no creado o contraseña incorrecta.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al intentar iniciar sesión.'); // Manejo de errores
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-section">
          <img src= {book2} alt="Login" />
        </div>
        <div className="form-section">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>} 
          <form>
            <input 
            type="email" 
            name="email" 
            value={email} 
            placeholder="Correo Electrónico" required 
            onChange={(e) => setEmail(e.target.value)}/>
            <input 
            type="password" 
            name="password" 
            value={password} 
            placeholder="Contraseña" required
            onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
            type="submit" 
            className="login-button"
            onClick={handleLogin} >Iniciar Sesión</button>
          </form>
          <div className="button-group">
            <a className="create-account" 
            href="/create-account"
            >Crear Cuenta</a>
            <a className="recover-account" 
            href="/forgot-password"
            >Recuperar Cuenta</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;