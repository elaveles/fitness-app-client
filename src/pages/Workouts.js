// Workouts.js
import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../context/UserContext';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No auth token found');
                }

                const apiUrl = process.env.REACT_APP_API_URL;

                const response = await fetch(`${apiUrl}/workouts/getMyWorkouts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data.workouts)) {
                    setWorkouts(data.workouts);
                } else {
                    console.warn('No workouts array in response:', data);
                    setWorkouts([]);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
                setError(error.message);
            }
        };

        if (user?.id) {
            fetchData();
        }
    }, [user]);

    return (
        <Container className="mt-5 text-center">
            {error && <div className="alert alert-danger">{error}</div>}
            
            {user && user.id ? (
                workouts.length > 0 ? (
                    <>
                        <h1>Workouts</h1>
                        <Row>
                            {workouts.map(workout => (
                                <Col md={3} key={workout._id}>
                                    <WorkoutCard workouts={workout} />
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <h1>No Workouts</h1>
                )
            ) : (
                <>
                    <h1>You are not logged in</h1>
                    <Link to="/login">
                        <Button variant="primary">Login to View</Button>
                    </Link>
                </>
            )}
        </Container>
    );
}
