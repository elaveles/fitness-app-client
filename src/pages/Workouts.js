import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../context/UserContext';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (Array.isArray(data.workouts)) {
                    setWorkouts(data.workouts);
                } else {
                    setWorkouts([]);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className="mt-5 text-center">
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
