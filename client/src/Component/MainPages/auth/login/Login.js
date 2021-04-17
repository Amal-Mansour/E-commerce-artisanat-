import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="laogin-page">
      <Form className="form-container" onSubmit={loginSubmit}>
        <Form.Group className="formBasicInput">
          <h2>Login:</h2>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter email"
            value={user.email}
            onChange={onChangeInput}
          />
        </Form.Group>

        <Form.Group className="formBasicInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />
        </Form.Group>
        <Form.Group className="formBasicInput">
          <Form.Check type="checkbox" label="register password" />
        </Form.Group>
        <div className="btn-user">
          <Button className="btnLogin" type="submit">
            Login
          </Button>
          <Link to="/register" className="linkRagister">
            {" "}
            create an account
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
