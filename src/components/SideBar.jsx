import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

export function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let linksnav = [];

  if (isAuthenticated) {
    const grupo = Cookies.get('group');

    if (grupo == 1) {
      linksnav.push(
        <Nav.Link key="clientes" href="/Clientes/">
          Clientes
        </Nav.Link>
      );
    } else if (grupo == 2) {
      linksnav.push(
        <Nav.Link key="Vencimientos" href="/vencimientos/">
          Vencimientos
        </Nav.Link>
      );
      linksnav.push(
        <Nav.Link key="Documentos" href="/Documentos/">
          Documentos
        </Nav.Link>
      );
      linksnav.push(
        <Nav.Link key="Programas" href="/Programas/">
          Programas
        </Nav.Link>
      );
    } else {
      return <Navigate to="/logout/" />;
    }

    return (
      <>
        <Nav
          variant="pills"
          defaultActiveKey="/home"
          className="navbar d-flex justify-content-between"
        >
          <Button
            variant="bg-dark"
            onClick={handleShow}
            className="menusidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
            </svg>
          </Button>
          <Nav.Item className="navbaritem">
            <Nav.Link className="navbarlink" key="logout" href="/logout/">
              <FontAwesomeIcon icon={faPowerOff} />
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton className="sideheader">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="sidebody">
            <Nav
              defaultActiveKey="/home"
              className="flex-column"
              style={{ marginBottom: 'auto' }}
            >
              {linksnav}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}
