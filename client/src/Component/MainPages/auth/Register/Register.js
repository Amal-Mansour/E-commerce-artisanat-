import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="laogin-page">
      <Form className="form-container" onSubmit={registerSubmit}>
        <Form.Group className="formBasicInput">
          <h2>Register:</h2>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            placeholder="Enter Username"
            value={user.name}
            onChange={onChangeInput}
          />
        </Form.Group>
        <Form.Group className="formBasicInput">
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
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="register password"
            className="formBasicInput"
          />
        </Form.Group>
        <div className="btn-user">
          <Button className="btnLogin" type="submit">
            Register
          </Button>
          <Link to="/login" className="linkRagister">
            {" "}
            already have an account
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
