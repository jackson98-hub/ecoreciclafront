import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faNewspaper, faHeart, faKey, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import '../styles/LeftMenu.css';

function LeftMenu({ name }) {
  return (
    <Nav className="bg-light border-right flex-column" id="sidebar" style={{ marginLeft: 0 }}>
      <div className="sidebar-heading">
        <FontAwesomeIcon icon={faUserCircle} className="mr-2" style={{ fontSize: '24px', color: '#1877f2' }} />
        <span className="user-name fw-bold">{name}</span>
      </div>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/perfil">
          <FontAwesomeIcon icon={faUser} className="fa" />
          Mi Perfil
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/publicaciones">
          <FontAwesomeIcon icon={faNewspaper} className="fa" />
          Mis Publicaciones
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/mis-favoritos">
          <FontAwesomeIcon icon={faHeart} className="fa" />
          Mis Favoritos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/cambiar-contrasena">
          <FontAwesomeIcon icon={faKey} className="fa" />
          Cambiar Contraseña
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/ayuda">
          <FontAwesomeIcon icon={faQuestionCircle} className="fa" />
          Ayuda/Soporte
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item">
        <Nav.Link href="/acerca-de">
          <FontAwesomeIcon icon={faInfoCircle} className="fa" />
          Acerca de
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default LeftMenu;    