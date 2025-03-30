import React, { useState } from "react";
import axios from "axios";

const RegistrarCasa = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState([]);
    const ususario_id = 1; // Reemplázalo con el ID del usuario logueado

    const handleFileChange = (event) => {
        setImagen(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("ubicacion", ubicacion);
        formData.append("precio", precio);
        formData.append("ususario_id", ususario_id);
        for (let i = 0; i < imagen.length; i++) {
            formData.append("imagen", imagen[i]);
        }

        try {
            await axios.post("http://localhost:4000/api/casas/registrar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Casa registrada exitosamente");
        } catch (error) {
            console.error("Error al registrar casa:", error);
        }
    };

    return (
        <div>
            <h2>Registrar Casa</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                <input type="text" placeholder="Dirección" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
                <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                <input type="file" multiple onChange={handleFileChange} required />
                <button type="submit">Registrar Casa</button>
            </form>
        </div>
    );
};

export default RegistrarCasa;
