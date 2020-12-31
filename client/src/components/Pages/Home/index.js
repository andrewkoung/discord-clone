import React from "react";
import { withFirebase } from "../../Firebase";
import "./style.css";
import { Button, Container } from "react-bootstrap";

function Home({ firebase }) {
  return (
    <div id="loginBackground">
        <Container className="d-flex h-100 align-items-center">
            <div className="login-box"> 
                <div className="container">
                    <div className="login-heading row">
                        <div className="col-12">
                            <h1>Welcome back</h1>
                            <p>We're so excited to see you again!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  );
}

export default withFirebase(Home);
