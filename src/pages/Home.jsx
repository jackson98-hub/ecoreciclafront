import React, { useState } from 'react';
import TopMenu from '../components/TopMenu';
import LeftMenu from '../components/LeftMenu';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';

function HomePage({ onLogout, name }) {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  return (
    <>
      <TopMenu onLogout={handleLogout} onMenuClick={handleSidebarShow} />
      <Container fluid>
        <Row>
          <Col md={3} className="d-none d-md-block">
            <LeftMenu name={name} />
          </Col>
          <Col md={9} className="ml-sm-auto col-lg-10 px-md-4">
            <div className="container d-flex justify-content-center align-items-center vh-100">
              <div className="card p-4">
                <h1 className="text-center mb-4">Bienvenido a la página principal</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Offcanvas show={showSidebar} onHide={handleSidebarClose} className="d-md-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LeftMenu name={name} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HomePage;