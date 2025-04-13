import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    avatar: null,
    bio: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  // Obtener datos del usuario desde localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // Si no hay sesión activa, redirigir al login
      navigate('/');
      return;
    }

    // Recuperar datos del usuario de localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(prevData => ({
          ...prevData,
          ...parsedData
        }));
        
        // Recuperar preview de avatar si existe
        if (localStorage.getItem('userAvatar')) {
          setPreview(localStorage.getItem('userAvatar'));
        }
      } catch (error) {
        console.error('Error al procesar datos del usuario:', error);
      }
    }
    
    // Cleanup function para limpiar la memoria al desmontar el componente
    return () => {
      // Si hay una URL de tipo blob en el preview, revocarla para liberar memoria
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar el tamaño del archivo (limitar a 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es 5MB.');
        return;
      }
      
      setUserData({ ...userData, avatar: file });
      
      // Convertir la imagen a Base64 en lugar de crear un URL blob
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        // Guardar imagen como Base64 en localStorage
        localStorage.setItem('userAvatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData.nombre || !userData.email) {
      alert('Nombre y email son campos obligatorios');
      return;
    }

    try {
      // Simulación de actualización exitosa (reemplazar con llamada real cuando haya backend)
      // const formData = new FormData();
      // Object.entries(userData).forEach(([key, value]) => {
      //   if (key !== 'avatar' || value instanceof File) {
      //     formData.append(key, value);
      //   }
      // });
      // await axios.post('/api/profile', formData);
      
      // Actualizar datos del usuario en localStorage
      const userDataToStore = { ...userData };
      if (userDataToStore.avatar instanceof File) {
        delete userDataToStore.avatar; // No guardamos el archivo en localStorage
      }
      localStorage.setItem('userData', JSON.stringify(userDataToStore));
      
      setSuccessMessage('Perfil actualizado correctamente!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      alert('Error al guardar los datos');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-content">
          {preview ? (
            <div className="header-avatar">
              <img src={preview} alt="Avatar" />
            </div>
          ) : (
            <div className="header-avatar default-header-avatar">
              <span>{userData.nombre ? userData.nombre.charAt(0).toUpperCase() : '?'}</span>
            </div>
          )}
          <div className="header-info">
            <h1>Cuenta</h1>
            <p className="profile-subtitle">
              {userData.nombre} {userData.apellido}, {userData.email}
            </p>
          </div>
        </div>
      </div>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      
      <div className="profile-card">
        <div className="profile-section">
          <div className="section-header">
            <h2>Información personal</h2>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-button"
              >
                Editar
              </button>
            ) : null}
          </div>
          
          {!isEditing ? (
            <div className="profile-info">
              <div className="profile-row">
                <div className="info-group">
                  <label>Nombre</label>
                  <p>{userData.nombre}</p>
                </div>
                <div className="info-group">
                  <label>Apellido</label>
                  <p>{userData.apellido}</p>
                </div>
              </div>
              
              <div className="profile-row">
                <div className="info-group">
                  <label>Correo electrónico</label>
                  <p>{userData.email}</p>
                </div>
                <div className="info-group">
                  <label>Teléfono</label>
                  <p>{userData.telefono || 'No especificado'}</p>
                </div>
              </div>
              
              <div className="profile-row">
                <div className="info-group wide">
                  <label>Biografía</label>
                  <p>{userData.bio || 'Sin biografía'}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="avatar-section">
                <label htmlFor="avatar-upload">
                  <div className="avatar-preview">
                    {preview ? (
                      <img src={preview} alt="Preview" />
                    ) : (
                      <div className="default-avatar">
                        <span>{userData.nombre ? userData.nombre.charAt(0).toUpperCase() : '+'}</span>
                      </div>
                    )}
                  </div>
                  <span className="avatar-label">Cambiar foto</span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={userData.apellido}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Biografía</label>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  maxLength="200"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
              </div>

              <div className="form-buttons">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <div className="back-link">
        <Link to="/home">← Volver a inicio</Link>
      </div>
    </div>
  );
};

export default Profile;