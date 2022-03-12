import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarCuy = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#" style={{ letterSpacing: "0.2em" }}>
          BasicRest
        </Navbar.Brand>
        <Nav className="me-auto"></Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarCuy;
