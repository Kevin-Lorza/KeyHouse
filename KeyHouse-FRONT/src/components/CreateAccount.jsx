import React, { useState } from 'react';
import '../styles/CreateAccount.css';
import book1 from '../images/book.image2.jpg';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    setErrorMessage(''); // Limpiar el mensaje de error

    try {
      // Verificar si el correo ya existe
      const response = await fetch('http://localhost:4000/api/usuarios/');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      console.log(data); // Verifica la estructura de la respuesta
  
      // Accede al array de usuarios
      const userArray = data.body || []; // Asegúrate de que existe el array
      const user = userArray.find(user => user.email.toLowerCase() === email.toLowerCase()); 
      console.log(user)// Comparar sin importar mayúsculas/minúsculas
  
      if (user) {
        setErrorMessage('Correo electrónico ya vinculado a una cuenta');
        alert ('Este correo electronico ya se encuentra vinculado a otra cuenta') // Mostrar mensaje de error
      } else {
        // Crear el objeto con la información del usuario
        const Create = {
          nombre: name,
          cedula: cedula,
          edad: edad,
          telefono: telefono,
          email: email,
          contraseña: password,
        };
    
        const CreateJson = JSON.stringify(Create);
        console.log(CreateJson);
    
        // Hacer el fetch a la API para crear la cuenta
        const createResponse = await fetch('http://localhost:4000/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indica que el cuerpo es JSON
          },
          body: CreateJson,
        });

        if (!createResponse.ok) {
          throw new Error('Error al crear la cuenta');
        }

        const createData = await createResponse.json();
        console.log(createData);
        alert('Cuenta creada exitosamente. No olvides tu respuesta de seguridad.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error. Intenta nuevamente.'); // Manejo de errores
    }
  };

  return (
    <div className="Create-Container">
            <div className="Create-Box">
                <div className="Form-Section">
                    <h2>Crear Cuenta</h2>
                    {error && <p className="error-message">{error}</p>} 
                    <form onSubmit={handleSubmit} >
                        <input type="nombre" 
                        placeholder="Nombre" 
                        name="nombre" 
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required />
                        <input type="cedula" 
                        placeholder="Cédula" 
                        name="cedula" 
                        value={cedula}
                        onChange={(e)=> setCedula(e.target.value)}
                        required />
                        <input type="edad" 
                        placeholder="Edad" 
                        name="edad" 
                        value={edad}
                        onChange={(e)=> setEdad(e.target.value)}
                        required />
                        <input type="telefono" 
                        placeholder="Teléfono" 
                        name="telefono" 
                        value={telefono}
                        onChange={(e)=> setTelefono(e.target.value)}
                        required />
                        <input type="email" 
                        placeholder="Correo Electrónico"
                        name="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required />
                        <input type="password" 
                        placeholder="Contraseña"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required />
                        <button type="submit" 
                        className="Create-Account-Button"
                        >Crear Cuenta</button>
                    </form>
                    <div className="Button-Group">
                        <a className="Login-Account" href="/"
                        >Iniciar Sesión</a>
                        <a className="Recover-Account" href="/forgot-password" >Recuperar Cuenta</a>
                    </div>
                </div>
                <div className="Create-Image">
                    <img src={book1} alt="Imagen de Fondo" />
                </div>
            </div>
    </div>
  );
};
export default CreateAccount;