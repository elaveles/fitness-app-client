import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-vh-100 w-100 bg-dark position-relative overflow-hidden">
            <div 
                className="position-absolute w-100 h-100"
            />

            <div 
                className="position-absolute w-100 h-100"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300897b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.1,
                    zIndex: 2
                }}
            />

            <Row className="min-vh-100 w-100 d-flex align-items-center justify-content-center m-0 position-relative" style={{ zIndex: 3 }}>
                <Col className="text-center px-4">
                    <div className="mb-5">
                        <h1 className="display-2 fw-bold text-white mb-3">
                            Fit<span className="text-success">Journey</span>
                        </h1>
                        <p className="lead fs-3 text-light mb-4">Your Companion for Every Milestone</p>
                        <p className="text-light-50 mb-5">Track. Progress. Achieve.</p>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-5">
                        <Link 
                            className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold" 
                            to="/workouts" 
                            style={{ boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)' }}
                        >
                            <i className="bi bi-play-circle-fill me-2"></i>
                            Start Your Journey
                        </Link>
                        <Link 
                            className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill" 
                            to="/register" 
                            style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                        >
                            Join Now!
                        </Link>
                    </div>

                    <Row className="justify-content-center g-4">
                        <Col xs={12} md={4} className="text-center">
                            <div className="p-3">
                                <h3 className="text-success fw-bold mb-2">500+</h3>
                                <p className="text-light mb-0">Workout Routines</p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="text-center">
                            <div className="p-3">
                                <h3 className="text-success fw-bold mb-2">50K+</h3>
                                <p className="text-light mb-0">Active Members</p>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="text-center">
                            <div className="p-3">
                                <h3 className="text-success fw-bold mb-2">100%</h3>
                                <p className="text-light mb-0">Personalized</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* CSS Reset */}
            <style>
                {`
                    body {
                        margin: 0;
                        padding: 0;
                        overflow-x: hidden;
                    }
                `}
            </style>
        </div>
    );
}