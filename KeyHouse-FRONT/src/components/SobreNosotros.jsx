import React from "react";
import "../styles/SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros">
      <div className="sobre-nosotros-content">
        <h1>Sobre KeyHouse</h1>

        <p>
          En <strong>KeyHouse</strong>, creemos que un hogar no es solo un lugar físico: es un espacio de crecimiento, bienestar y nuevas oportunidades.
          Fundada con el objetivo de revolucionar la forma en la que las personas encuentran su próximo hogar, somos una plataforma digital que conecta de manera sencilla, segura y eficiente a propietarios e inquilinos.
        </p>

        <p>
          Nuestra empresa nació de la necesidad de ofrecer soluciones de alojamiento que fueran más humanas, accesibles y transparentes,
          entendiendo que detrás de cada búsqueda de apartamento hay sueños, proyectos y nuevas etapas de vida.
          Con una interfaz amigable, un proceso de publicación sencillo y un sistema de búsqueda inteligente,
          trabajamos para que encontrar un lugar para vivir sea una experiencia positiva y sin complicaciones.
        </p>

        <h2>Misión</h2>
        <p>
          Transformar el proceso de búsqueda y alquiler de apartamentos, brindando un espacio digital confiable
          donde las personas puedan encontrar el hogar ideal, al tiempo que apoyamos a propietarios a maximizar el potencial de sus propiedades.
        </p>

        <h2>Visión</h2>
        <p>
          Ser la plataforma de referencia en el mercado latinoamericano y mundial para quienes buscan o ofrecen espacios de vivienda,
          siendo sinónimo de confianza, innovación y compromiso social.
        </p>

        <h2>Valores</h2>
        <ul className="valores-lista">
          <li><strong>Transparencia:</strong> Procesos claros y honestos para todos los usuarios.</li>
          <li><strong>Innovación:</strong> Tecnología para simplificar y mejorar la experiencia de alquiler.</li>
          <li><strong>Empatía:</strong> Comprensión profunda de las necesidades de quienes buscan y ofrecen vivienda.</li>
          <li><strong>Seguridad:</strong> Protección de la información y de cada interacción.</li>
          <li><strong>Compromiso:</strong> Acompañamiento constante a nuestros usuarios.</li>
        </ul>

        <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#0066cc" }}>
          KeyHouse: Tu llave hacia un nuevo comienzo.
        </p>
      </div>
    </div>
  );
};

export default SobreNosotros;