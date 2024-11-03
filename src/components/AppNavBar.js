import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    const toggleStyle = {
        border: '1px solid white',
        borderRadius: '4px',
    };

    return (
        <Navbar expand="lg" className="bg-dark text-light">
            <Container className="ms-0">
                <Navbar.Brand as={NavLink} to="/" className="text-light">FitJourney</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={toggleStyle} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" className="text-light">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/workouts" className="text-light">Workouts</Nav.Link>
                        {user.id !== null ? (
                            <>
                                <Nav.Link as={NavLink} to="/add" className="text-light">Add Workouts</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" className="text-light">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="text-light">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="text-light">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
