import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Button } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
//import axios from "axios";
import "./UserInfo.css";

function UsersInfo() {
  const state = useContext(GlobalState);
  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    adress: "",
    country: "",
    postal: "",
  });
  //const [cart, setCart] = state.usersAPI.cart;
  //const [isLogged] = state.usersAPI.isLogged;
  //const [isAdmin] = state.usersAPI.isAdmin;
  //const [token] = state.token;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const paymentSubmit = (e) => {
    e.preventdefault();
    console.log(info);
  };

  //  const paymentSubmit = async (e, { addToCart }) => {
  //    e.preventdefault();
  //
  //    await axios.post(
  //      "/api/payment",
  //      { ...info },
  //      {
  //        headers: { Authorization: token },
  //      }
  //    );
  //    setCart([]);
  //    addToCart([]);
  //    alert("you have successfully placed an order");
  //  };

  return (
    <div className="users">
      <div>
        <div className="usersInfo">
          <form className="formPaiment">
            <div className="display-name">
              <input
                className="info-user"
                placeholder="First name"
                name="First_name"
                value={info.fname}
                onChange={setInfo}
                type="text"
              />
              <input
                className="info-user"
                placeholder="last name"
                name="last_name"
                value={info.lname}
                onChange={setInfo}
                type="text"
              />
            </div>
            <div className="display-contact">
              <input
                className="info-user"
                placeholder="Phone"
                name="phone"
                value={info.phone}
                onChange={setInfo}
                type="text"
              />
              <input
                className="info-user"
                placeholder="Email"
                name="Email"
                value={info.email}
                onChange={setInfo}
                type="text"
              />
            </div>
            <div className="adress">
              <textarea
                className="info-user"
                placeholder="Adress"
                name="Adress"
                value={info.adress}
                onChange={setInfo}
                type="text"
                rows={3}
              />

              <CountryDropdown
                className="info-user"
                valueType="short"
                value={info.country}
                onChange={setInfo}
                name=""
              />
              <input
                className="info-user"
                placeholder="Postal code"
                name="Postal_code"
                value={info.postal}
                onChange={setInfo}
                type="text"
              />
            </div>
            <Button onClick={paymentSubmit} className="send-btn">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UsersInfo;
