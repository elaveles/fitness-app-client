import { Card, Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { useState } from 'react';

export default function WorkoutCard({ workouts, onWorkoutUpdate, onWorkoutDelete }) {
    const { _id, name, duration, status } = workouts;
    const notyf = new Notyf();
    
    const [show, setShow] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedDuration, setUpdatedDuration] = useState(duration);
    const [updatedStatus, setUpdatedStatus] = useState(status);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setUpdatedName(name);
        setUpdatedDuration(duration);
        setUpdatedStatus(status);
        setShow(true);
    };

    function updateWorkout() {
        fetch(`${process.env.REACT_APP_API_URL}/workouts/updateWorkout/${_id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: updatedName,
                duration: updatedDuration,
                status: updatedStatus
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                notyf.error("Unsuccessful Workout Update: " + data.error);
            } else {
                notyf.success("Workout Updated Successfully!");

                onWorkoutUpdate({
                    _id,
                    name: updatedName,
                    duration: updatedDuration,
                    status: updatedStatus
                });
            }
        })
        .catch(err => {
            console.error("Update Error:", err);
            notyf.error("Error updating workout.");
        });

        handleClose();
    }

    function deleteWorkout() {
        fetch(`${process.env.REACT_APP_API_URL}/workouts/deleteWorkout/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                notyf.error("Unsuccessful Workout Deletion: " + data.error);
            } else {
                notyf.success("Workout Deleted Successfully!");

                onWorkoutDelete(_id);
            }
        })
        .catch(err => {
            console.error("Delete Error:", err);
            notyf.error("Error deleting workout.");
        });
    }

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Duration:</Card.Subtitle>
                    <Card.Text>{duration}</Card.Text>
                    <Card.Subtitle>Status:</Card.Subtitle>
                    <Card.Text>{status}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Button variant="primary" size="sm" onClick={handleShow}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={deleteWorkout}>Delete</Button>
                </Card.Footer>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formWorkoutName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkoutDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedDuration}
                                onChange={(e) => setUpdatedDuration(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formWorkoutStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={updatedStatus}
                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateWorkout}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
