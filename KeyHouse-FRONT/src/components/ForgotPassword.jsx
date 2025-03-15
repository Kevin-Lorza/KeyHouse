import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css'; // Asegúrate de que la ruta sea correcta
import forgotImage from '../images/image.mybook3.jpg'; // Ruta de la imagen

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      console.log(data); // Verifica la estructura de la respuesta
  
      const userArray = data.body || []; // Asegúrate de que existe el array
      const user = userArray.find(user => user.email === email && user.r_seguridad === securityAnswer);
  
      if (user) {
        setShowModal(true); // Mostrar el modal para cambiar la contraseña
      } else {
        setError('El correo electrónico o la respuesta de seguridad son incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al intentar iniciar sesión.'); // Manejo de errores
    }
  };

  const handleChangePassword = async () => {
    try {
        console.log('Datos enviados:', { email, password: newPassword });
        const response = await fetch('http://localhost:4000/api/usuarios/cambiarContrasena', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, contraseña: newPassword }), // Enviar email y nueva contraseña
        });

        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }

        alert('Contraseña cambiada exitosamente');
        setShowModal(false); // Cerrar el modal
        navigate('/home'); // Redirigir a la página de inicio
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        setError('Error al cambiar la contraseña.'); // Manejo de errores
    }
};

  return (
    <div className="forgot-container">
      <div className="login-box">
        <div className="image-section">
          <img src={forgotImage} alt="Login" />
        </div>
        <div className="form-section">
          <h2>Cambia tu Contraseña</h2>
          {error && <p className="error-message">{error}</p>}
          <form>
            <input type="email" 
              placeholder="Correo Electrónico"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)} />
            <input type="text" 
              placeholder="Respuesta de seguridad"
              name="securityAnswer"
              value={securityAnswer}
              required
              onChange={(e) => setSecurityAnswer(e.target.value)} />
            <button type="submit" 
              className="recover-button"
              onClick={handleSubmit} >Cambiar contraseña</button>
          </form>
          <div className="button-group">
            <a className="create-account" href="/">Iniciar Sesión</a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cambiar Contraseña</h2>
            <input type="password" className="new_password_input"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleChangePassword}>Cambiar Contraseña</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
