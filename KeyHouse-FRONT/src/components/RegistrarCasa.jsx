import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../styles/RegistrarCasa.css";

const RegistrarCasa = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleFileChange = (event) => {
    const files = event.target.files;
    setImagen(files);

    const newPreviews = [];
    for (let i = 0; i < files.length; i++) {
      newPreviews.push(URL.createObjectURL(files[i]));
    }

    previews.forEach(url => URL.revokeObjectURL(url));

    setPreviews(newPreviews);
  };

  // Función para eliminar una imagen específica
  const removeImage = (index) => {
    const newImageArray = Array.from(imagen).filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setImagen(newImageArray);
    setPreviews(newPreviews);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateForm = () => {
    if (!titulo.trim()) return "El título es obligatorio";
    if (!descripcion.trim()) return "La descripción es obligatoria";
    if (!ubicacion.trim()) return "La ubicación es obligatoria";
    if (isNaN(precio) || precio <= 0) return "Ingrese un precio válido";
    if (imagen.length === 0) return "Debe subir al menos una imagen";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    const usuario_id = localStorage.getItem("usuario_id");
  
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("ubicacion", ubicacion);
    formData.append("precio", precio);
    formData.append("usuario_id", usuario_id);
  
    if (imagen.length > 0) {
      for (let i = 0; i < imagen.length; i++) {
        formData.append("imagen", imagen[i]);
      }
    }
  
    try {
      console.log("Enviando datos:", {
        titulo,
        descripcion,
        ubicacion,
        precio,
        usuario_id,
        totalImagenes: imagen.length,
      });
  
      const response = await axios.post("http://localhost:4000/api/casas/registrar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Respuesta del servidor:", response.data);
      alert("Casa registrada exitosamente");
  
      limpiarFormulario();
    } catch (error) {
      console.error("Error al registrar casa:", error);
  
      if (error.response) {
        setError(`Error del servidor: ${error.response.data.message || error.response.statusText || 'Error desconocido'}`);
      } else if (error.request) {
        setError("No se recibió respuesta del servidor. Verifique su conexión a internet.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setUbicacion("");
    setPrecio("");
    setImagen([]);
    setPreviews([]);
    setCurrentStep(1);
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <div className="close-button">✕</div>
            <h2>Háblanos de tu alojamiento.</h2>
            <div className="form-group">
              <label>Ubicación</label>
              <div className="location-input">
                <span className="location-icon position-relative"></span>
                <input
                  type="text" 
                  value={ubicacion} 
                  onChange={(e) => setUbicacion(e.target.value)} 
                  placeholder="📍Palmira, Cra 3 # 12-34" 
                  required 
                />
              </div>
            </div>
            <button 
              className="next-button" 
              onClick={nextStep}
              disabled={!ubicacion.trim()}
            >
              Actualiza la estimación
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="step-container">
            <div className="close-button">✕</div>
            <h2>Título de tu alojamiento</h2>
            
            <div className="form-group">
              <input 
                type="text" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Dale un título atractivo a tu alojamiento" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                placeholder="Describe brevemente tu alojamiento" 
                required
              ></textarea>
            </div>
            
            <div className="navigation-buttons">
              <button className="prev-button" onClick={prevStep}>Atrás</button>
              <button 
                className="next-button" 
                onClick={nextStep}
                disabled={!titulo.trim() || !descripcion.trim()}
              >
                Siguiente
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-container">
            <div className="close-button">✕</div>
            <h2>Precio</h2>
            
            <div className="form-group">
              <div className="price-input">
                <span className="currency-symbol">$</span>
                <input 
                  type="number" 
                  value={precio} 
                  onChange={(e) => setPrecio(e.target.value)} 
                  placeholder="0" 
                  required 
                  min="0" 
                  step="1" 
                />
              </div>
            </div>
            
            <div className="navigation-buttons">
              <button className="prev-button" onClick={prevStep}>Atrás</button>
              <button 
                className="next-button" 
                onClick={nextStep}
                disabled={!precio || precio <= 0}
              >
                Siguiente
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-container">
            <div className="close-button">✕</div>
            <h2>Sube fotos de tu alojamiento</h2>
            
            <div className="form-group">
              <div className="file-upload-area">
                <label htmlFor="file-upload">
                  <div className="upload-icon">📷</div>
                  <p>Haz clic aquí para subir imágenes</p>
                </label>
                <input 
                  id="file-upload"
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                  required 
                />
              </div>
              
              {imagen.length > 0 && (
                <div className="selected-files">
                  <p>{imagen.length} archivos seleccionados</p>
                </div>
              )}
              
              {/* Vista previa de imágenes */}
              {previews.length > 0 && (
                <div className="image-previews">
                  {previews.map((previewUrl, index) => (
                    <div key={index} className="image-preview-container">
                      <img 
                        src={previewUrl} 
                        alt={`Vista previa ${index + 1}`} 
                        className="image-preview"
                      />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mostrar mensaje de error si existe */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="navigation-buttons">
              <button 
                className="prev-button" 
                onClick={prevStep}
                disabled={isLoading}
              >
                Atrás
              </button>
              <button 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={isLoading || imagen.length === 0}
              >
                {isLoading ? 'Registrando...' : 'Registrar Casa'}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Limpiar URLs de vistas previas al desmontar
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="modal-overlay">
      <div className="registrar-casa-container">
        {renderStep()}
      </div>
      <div className="back-link">
        <Link to="/home">{'← Volver a inicio'}</Link>
      </div>
    </div>
  );
};

export default RegistrarCasa;