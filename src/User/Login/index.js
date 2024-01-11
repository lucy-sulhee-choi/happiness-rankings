import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";

import TextField from "../TextField";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn]= useState(localStorage.getItem("token")? true:false)
  const handleLogin = (event) => {
    event.preventDefault();

    const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
    const url = `${API_URL}/user/login`;

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
          setMessage(data.message);
        } else {
          localStorage.setItem("token", data.token);
          console.log(data.token)
          setIsLoggedIn(true);
          navigate({ pathname: "/" });
        }
      });
  };
  return (
    <Container fluid="lg" className="pt-2">
      <main className="flex-grow-1">
        <Row className="viewport-height-75 align-items-center">
          <Col md={6} lg={5} className="text-center">
          <FontAwesomeIcon icon={faCircleUser} style={{ color: "#6fccfb", }}
              className="page-icon "
            />
          </Col>
          <Col md={6} lg={7}>
            <h1 className="mb-5">Login</h1>
            {message ? (
              <div>
              <Alert variant="danger">
                {message}
              </Alert>
              <p className="register-message">
                  Haven't registered yet? Go to{" "}
                  <Link className="link-info link-offset-2" to="/register">
                    Register
                  </Link>
                </p>
              </div>
              
            ) : null}
            <Form onSubmit={handleLogin}>
              <TextField
                text="Email"
                type="email"
                onChange={setEmail}
                value={email}
              />
              <TextField
                value={password}
                text="Password"
                type="password"
                onChange={setPassword}
              />
              <Button type="submit" variant="info" className="mt-3">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </main>
    </Container>
  );
}