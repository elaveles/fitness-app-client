import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Register() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const notyf = new Notyf();

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;

            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();

            if (data.message === "Registered Successfully") {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                notyf.success(data.message);

                setRedirectToLogin(true);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            notyf.error(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsActive(
            email !== "" && 
            password !== "" && 
            confirmPassword !== "" && 
            password === confirmPassword
        );
    }, [email, password, confirmPassword]);

    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

    return (
        user.id !== null ? (
            <Navigate to="/workouts" />
        ) : (
            <Form onSubmit={registerUser} className="p-4">
                <h1 className="my-5 text-center">Register</h1>

                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!isActive || isLoading}
                >
                    {isLoading ? 'Registering...' : 'Submit'}
                </Button>
            </Form>
        )
    );
}
