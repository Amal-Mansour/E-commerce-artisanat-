import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
      toast.success("register sucssefuly", {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }
  };
  return (
    <div className="login_page">
      <div className="login_hier">
        <h6 className="login_animation ">Pleaze Register to by</h6>
      </div>
      <div className="form-boxs">
        <div>
          <div className="button-boxs">
            <button type="button" className="toggel-button">
              Regiter
            </button>
            <Link to="/login">
              <button type="button" className="toggel-button">
                Login
              </button>
            </Link>
          </div>

          <div className="sociale-button">
            <a   href="https://www.facebook.com/" className="fa fa-facebook"></a>
            <a   href="https://www.facebook.com/" className="fa fa-pinterest"></a>
            <a  href="https://www.facebook.com/" className="fa fa-twitter"></a>
            <a href="https://www.facebook.com/"  className="fa fa-google"></a>
          </div>
          <div className="from-box">
            <form className="input-group" onSubmit={registerSubmit}>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter Username"
                value={user.name}
                onChange={handleChange}
                className="formBasicInput"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                value={user.email}
                onChange={handleChange}
                className="formBasicInput"
              />

              <input
                type="password"
                name="password"
                required
                autoComplete="on"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="formBasicInput"
              />
              <Form.Check
                type="checkbox"
                id="autoSizingCheck2"
                className="check"
              />
              <span>Remember Password</span>
              <div className="btn-user">
                <Button type="submit" className="submit-btn">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
