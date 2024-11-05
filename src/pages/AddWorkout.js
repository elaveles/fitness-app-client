import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function AddWorkout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("pending");

  const notyf = new Notyf();

  function addWorkout(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
        status: status
      })
    })
    .then(res => {
      if (!res.ok) { 
        return res.json().then(err => {
          throw new Error(err.error || 'Failed to add workout');
        });
      }
      return res.json();
    })
    .then(data => {
      notyf.success('Workout Added Successfully!');
      navigate("/workouts");
    })
    .catch(error => {
      console.error('Error:', error);
      notyf.error(error.message);
    });

    setName("");
    setDuration("");
    setStatus("pending");
  }

  return (
    user.id
      ? <>
          <h1 className="my-5 text-center">Add Workout</h1>
          <Form onSubmit={addWorkout}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Duration" 
                required 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control 
                as="select" 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="my-5">Submit</Button>
          </Form>
        </>
      : <Navigate to="/workouts" />
  );
}