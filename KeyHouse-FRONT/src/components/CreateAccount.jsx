import React, { useState } from 'react';
import '../styles/CreateAccount.css';
import logo from '../images/Logosf.png';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/usuarios/');
      if (!response.ok) throw new Error('Error en la respuesta de la API');

      const data = await response.json();
      const userArray = data.body || [];
      const user = userArray.find(user => user.email.toLowerCase() === email.toLowerCase());

      if (user) {
        setErrorMessage('Correo electrónico ya vinculado a una cuenta');
        alert('Este correo electrónico ya se encuentra vinculado a otra cuenta');
      } else {
        const Create = {
          nombre: name,
          cedula: cedula,
          edad: edad,
          telefono: telefono,
          email: email,
          contraseña: password,
        };

        const CreateJson = JSON.stringify(Create);
        const createResponse = await fetch('http://localhost:4000/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: CreateJson,
        });

        if (!createResponse.ok) throw new Error('Error al crear la cuenta');

        const createData = await createResponse.json();
        console.log('Cuenta creada:', createData);
        alert('Cuenta creada exitosamente. Inicia sesión para continuar.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error. Intenta nuevamente.');
    }
  };

  return (
    <div className="create-container">
      <div className="create-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Crear Cuenta</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
          <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
          <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="create-account-button">Crear Cuenta</button>
        </form>
        <div className="button-group">
          <a className="login-account" href="/">Iniciar Sesión</a>
          <a className="recover-account" href="/forgot-password">Recuperar Cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
