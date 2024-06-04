// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa el archivo de estilos CSS

function Navbar() {
  return (
    <nav>
      <ul className="navbar-list"> {/* Agrega una clase para aplicar estilos */}
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/email-verification">Registro</Link> 
        </li>
        <li>
          <Link to="/login">Iniciar sesión</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
