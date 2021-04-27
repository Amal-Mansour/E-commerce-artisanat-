import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

toast.configure();
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
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    }
  };
  return (
    <div calssName="login_page">
      {/*<div className="login_hier">
        <h6 className="login_animation ">Pleaze Login to by</h6>
      </div>*/}
      <div className="form-box">
        <div>
          <div className="button-box">
            <button type="button" className="toggel-btn">
              Login
            </button>
            <Link to="/register">
              <button type="button" className="toggel-btn">
                Regiter
              </button>
            </Link>
          </div>
          <div className="sociale-button">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-pinterest"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-google"></a>
          </div>
          <div className="from-box">
            <form className="input-group" onSubmit={loginSubmit}>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                value={user.email}
                onChange={onChangeInput}
                className="formBasicInput"
              />

              <input
                type="password"
                name="password"
                required
                placeholder=" Enter password"
                value={user.password}
                onChange={onChangeInput}
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
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
