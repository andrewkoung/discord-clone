import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../Session/AuthContext";
import { withFirebase } from "../../Firebase";
import { Link, useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import './style.css';

function Signup({ firebase }) {
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const dobRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                usernameRef.current.value,
                passwordRef.current.value,
                dobRef.current.value
            );
            history.push("/dashboard");
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <div id="signupBackground">
            <Container className="d-flex h-100 align-items-center">
                <div className="signup-box">
                    <div className="container">
                        <div className="signup-heading row">
                            <div className="col-12">
                                <h3 style={{ color: 'white' }}>Create an account</h3>
                            </div>
                        </div>
                        <div className="login-form row mx-2">
                            <div className="col-12">
                                <Form id="signupForm" onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>
                                            EMAIL
                                        </Form.Label>
                                        <Form.Control type="email" className="signup-inputs" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>
                                            USERNAME
                                        </Form.Label>
                                        <Form.Control type="text" className="signup-inputs" ref={usernameRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>
                                            PASSWORD
                                        </Form.Label>
                                        <Form.Control type="password" className="signup-inputs" ref={passwordRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>
                                            DATE OF BIRTH
                                        </Form.Label>
                                        <Form.Control type="date" className="signup-inputs" ref={dobRef} placeholder="DOB" required/>
                                    </Form.Group>
                                    <Button disabled={loading} className="w-100 mt-3 mb-2 login-button" type="submit">
                                        Continue
                                    </Button>
                                    <Link to="/" style={{color: '#7289da', fontSize: '14px' }}>Already have an account?</Link>
                                    <p style={{color: 'grey', fontSize: '11px', marginTop: '10px'}}>By registering, you agree to some non-existent TOS and Policy</p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default withFirebase(Signup);
