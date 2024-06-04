import React from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

function TopMenu({ onLogout, onMenuClick }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <div className="container justify-content-between flex-column">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Navbar.Brand href="/">
            <i className="fas fa-home"></i> Logo
          </Navbar.Brand>
          <Button variant="primary" className="d-md-none" onClick={onMenuClick}>
            <i className="fas fa-bars"></i>
          </Button>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-md-none" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <i className="fas fa-search"></i> Inicio
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Buscar" className="mr-2" aria-label="Buscar" />
            <Button variant="outline-primary">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="/explorar">
              <i className="fas fa-globe"></i> Explorar
            </Nav.Link>
            <Nav.Link href="/configuracion">
              <i className="fas fa-cog"></i> Configuración
            </Nav.Link>
            <Button variant="danger" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default TopMenu;