import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const notyf = new Notyf();

    const authenticate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            if (data.access) {
                localStorage.setItem('token', data.access);
                await retrieveUserDetails(data.access);
                notyf.success('Thank you for logging in.');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
            notyf.error(error.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    const retrieveUserDetails = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('User details error:', errorText);
                throw new Error(`Failed to get user details: ${response.status}`);
            }

            const data = await response.json();

            if (data.user) {
                setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
            } else {
                throw new Error('User details not found');
            }
        } catch (error) {
            console.error('Error retrieving user details:', error);
            notyf.error("Failed to retrieve user details");
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        user.id !== null ? (
            <Navigate to="/workouts" />
        ) : (
            <Form onSubmit={authenticate} className="p-4">
                <h1 className="my-5 text-center">Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!isActive || isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Submit'}
                </Button>
            </Form>
        )
    );
}
