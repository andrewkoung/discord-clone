import React, { useState, useRef } from "react";
import { withFirebase } from "../../Firebase";
import "./style.css";
import { Form, Button, Container } from "react-bootstrap";
import { useAuth } from "../../Session/AuthContext"
import { Link, useHistory } from "react-router-dom";

function Home() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault(); 

        try { 
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/dashboard')
        } catch {
            setError("Failed to log in")
        }
        setLoading(false);
    }

    return (
        <div id="loginBackground">
            <Container className="d-flex h-100 align-items-center">
                <div className="login-box">
                    <div className="container">
                        <div className="login-heading row">
                            <div className="col-12">
                                <h3 style={{ color: 'white' }}>Welcome back</h3>
                                <p style={{ color: 'grey' }}>We're so excited to see you again!</p>
                            </div>
                        </div>
                        <div className="login-form row mx-2">
                            <div className="col-12">
                                <Form id="loginForm" onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>
                                            {(error) ? <span style={{color: 'red'}}>EMAIL OR PHONE NUMBER - <em>Login or password is invalid</em></span> : <span>EMAIL OR PHONE NUMBER</span>}
                                        </Form.Label>
                                        <Form.Control type="email" className="login-inputs" ref={emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password" style={{marginBottom: '0px'}}>
                                        <Form.Label>
                                            {(error) ? <span style={{color: 'red'}}>PASSWORD - <em>Login or password is invalid</em></span> : <span>PASSWORD</span>}
                                        </Form.Label>
                                        <Form.Control type="password" className="login-inputs" ref={passwordRef} required />
                                    </Form.Group>
                                    <Link to="/recoverpassword" style={{color: '#7289da', fontSize: '13px'}}>Forgot your password?</Link>
                                    <Button disabled={loading} className="w-100 mt-3 login-button" type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        <div className="login-bottom row mt-2 mx-2">
                            <div className="col-12">
                                <p style={{fontSize: '13px', color: '#4e5157'}}>Need an account? <Link to="/signup" style={{color: '#7289da'}}>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default withFirebase(Home);
