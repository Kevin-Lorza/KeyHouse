import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Secciones de columnas */}
        <div className="footer-columns">
          {/* Columna Asistencia */}
          <div className="footer-column">
            <h3>Asistencia</h3>
            <ul>
              <li>
                <Link to="/ayuda" className="footer-link">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link to="/seguridad" className="footer-link">
                  Seguridad
                </Link>
              </li>
              <li>
                <Link to="/cancelacion" className="footer-link">
                  Opciones de cancelación
                </Link>
              </li>
              <li>
                <Link to="/problemas-reserva" className="footer-link">
                  Problemas con una reserva
                </Link>
              </li>
              <li>
                <Link to="/discapacitados" className="footer-link">
                  Apoyo para discapacitados
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Modo Anfitrión */}
          <div className="footer-column">
            <h3>Modo anfitrión</h3>
            <ul>
              <li>
                <Link to="/publicar" className="footer-link">
                  Publicar un apartamento
                </Link>
              </li>
              <li>
                <Link to="/consejos" className="footer-link">
                  Consejos para arrendadores
                </Link>
              </li>
              <li>
                <Link to="/recursos" className="footer-link">
                  Recursos para anfitriones
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="footer-link">
                  Garantía Keyhouse
                </Link>
              </li>
              <li>
                <Link to="/coinquilino" className="footer-link">
                  Buscar un coinquilino
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Keyhouse */}
          <div className="footer-column">
            <h3>Keyhouse</h3>
            <ul>
              <li>
                <Link to="/sobre" className="footer-link">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/trabaja" className="footer-link">
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link to="/inversionistas" className="footer-link">
                  Inversionistas
                </Link>
              </li>
              <li>
                <Link to="/espacios" className="footer-link">
                  Espacios en Keyhouse.org
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sección inferior con redes sociales y enlaces legales */}
        <div className="footer-bottom">
          <div className="social-links">
            <Link
              to="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="social-icon"
            >
              <FaFacebook />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              className="social-icon"
            >
              <FaXTwitter />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="social-icon"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://tiktok.com"
              target="_blank"
              aria-label="TikTok"
              className="social-icon"
            >
              <FaTiktok />
            </Link>
          </div>

          <div className="legal-links">
            <span className="copyright">&copy; 2025 Keyhouse, Inc.</span>
            <Link to="/privacidad" className="legal-link">
              Privacidad
            </Link>
            <Link to="/terminos" className="legal-link">
              Términos
            </Link>
            <Link to="/mapa" className="legal-link">
              Mapa del sitio
            </Link>
            <Link to="/datos" className="legal-link">
              Datos de la empresa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
