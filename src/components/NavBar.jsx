import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar'

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (

    <div>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/'>E-COMMERCE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to='/login'><i className="fa-regular fa-user"></i></Nav.Link>
              <Nav.Link as={Link} to='/purchases'><i className="fa-solid fa-box-archive"></i></Nav.Link>
              <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSidebar show={show} handleClose={handleClose}/>     

    </div>
  );
}

export default NavBar;