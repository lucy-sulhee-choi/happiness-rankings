import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthOceania } from '@fortawesome/free-solid-svg-icons';

function HighlightLink(props) {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return <Nav.Link {...props} active={match} />;
}

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogOut =()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <header>
      <Navbar bg="info" expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <FontAwesomeIcon icon={faEarthOceania} />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <HighlightLink to="/" as={Link}>
                Home
              </HighlightLink>
              <HighlightLink to="/Countries" as={Link}>
              Rankings by Countries
              </HighlightLink>
              <HighlightLink to="/Years" as={Link}>
              Rankings by Years
              </HighlightLink>
              <HighlightLink to="/Rankings" as={Link}>
                Rankings with Factors
              </HighlightLink>             
              <HighlightLink to="/Factors" as={Link}>
                Compare Factors
              </HighlightLink>
            </Nav>
            <Nav className="ms-auto">
            {!isLoggedIn ? (
                <HighlightLink to="/login" as={Link}>
                  Login
                </HighlightLink>
              ) : null}
              {!isLoggedIn ? (
                <HighlightLink to="/register" as={Link}>
                  Register
                </HighlightLink>
              ) : null}
              {isLoggedIn ? (
                <HighlightLink to="/" as={Link} onClick={handleLogOut}>
                  Logout
                </HighlightLink>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}