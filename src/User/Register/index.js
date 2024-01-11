import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import TextField from "../TextField";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
  }, [registration])

  const register = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
    const url = `${API_URL}/user/register`;
    if (password === confirmPassword) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(true);
            setMessage(data.message)
            setRegistration(false);
          } else {                 
          setError(false);
          setMessage(data.message);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setRegistration(true);
          }
        })
        .catch((error)=>{
          setError(true);
          setMessage("An error occurred during registration.");
          console.error(error);
        });    
    }
    else {
      setError(true)
      setMessage("Please confirm password")
    }
  };
  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
            <FontAwesomeIcon icon={faIdCard} style={{ color: "#6fccfb", }}
              className="page-icon "
            />
          </Col>
          <Col md={6} lg={7}>

            <h1 className="mb-5">Register</h1>
            {message ? (
              <Alert variant={!error ? "success" : "danger"}>{message}</Alert>
            ) : null}
            <div>
              {registration && !error && (
                <p className="register-message">
                  Your email has been successfully registered. Go to{" "}
                  <Link className="link-info link-offset-2" to="/login">
                    Login
                  </Link>
                </p>
              )}</div>
            <div style={{ width: "100%" }}>
              <Form className="mb-3">

                <TextField
                  text="Email"
                  type="email"
                  onChange={setEmail}
                  value={email}
                />
                <TextField
                  text="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
                <TextField
                  text="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />

                <Button
                  type="submit"
                  variant="info"
                  className="mt-3"
                  onClick={(event) => {
                    register(event)
                  }}
                >
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </main>
    </Container>
  );
}