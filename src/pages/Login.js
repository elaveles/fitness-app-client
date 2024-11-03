import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import {Notyf} from 'notyf';
import UserContext from '../context/UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const notyf = new Notyf();


    const authenticate = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                notyf.success('Thank you for logging in.');
            } else if (data.message === "Incorrect email or password") {
                notyf.error("Incorrect email or password");
            } else if (data.message === "No email found") {
                notyf.error("Email does not exist");
            } else {
                notyf.error("Something went wrong");
            }
        });

        setEmail('');
        setPassword('');
    };

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
            }
        });
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        user.id !== null ? (
            <Navigate to="/workouts" />
        ) : (
            <Form onSubmit={authenticate}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isActive}>
                    Submit
                </Button>
            </Form>
        )
    );
}
