import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Button } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
//import axios from "axios";
import "./UserInfo.css";

//import { toast } from "react-toastify";

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
  //const [payment, setPayment] = useState({});
  const [cart, setCart] = state.usersAPI.cart;
  //const [isLogged] = state.usersAPI.isLogged;
  //const [isAdmin] = state.usersAPI.isAdmin;
  const [token] = state.token;
  //console.log(payment);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  //const paymentSubmit = async (e) => {
  //  e.preventDefault();
  //  // console.log(info);
  //  try {
  //    const newOrder = await axios.post("/api/payment", { ...info });
  //
  //  } catch (err) {
  //    alert(err.response.data.msg);
  //  }
  //};
  //const paymentSubmit = async (e) => {
  //  console.log(info);
  //  await axios.post(
  //    "/api/payment",
  //    { ...info },
  //    {
  //      headers: { Authorization: token },
  //    }
  //  );
  //  setCart([]);
  //  //setPayment([]);
  //  alert("you have successfully placed an order");
  //};

  return (
    <div className="users">
      <div>
        <div className="usersInfo">
          <form className="formPaiment">
            {/*onSubmit={paymentSubmit}*/}
            <div className="display-name">
              <input
                className="info-user"
                placeholder="First name"
                name="First_name"
                value={info.fname}
                onChange={onChangeInput}
                type="text"
              />
              <input
                className="info-user"
                placeholder="last name"
                name="last_name"
                value={info.lname}
                onChange={onChangeInput}
                type="text"
              />
            </div>
            <div className="display-contact">
              <input
                className="info-user"
                placeholder="Phone"
                name="phone"
                value={info.phone}
                onChange={onChangeInput}
                type="text"
              />
              <input
                className="info-user"
                placeholder="Email"
                name="Email"
                value={info.email}
                onChange={onChangeInput}
                type="text"
              />
            </div>
            <div className="adress">
              <textarea
                className="info-user"
                placeholder="Adress"
                name="Adress"
                value={info.adress}
                onChange={onChangeInput}
                type="text"
                rows={3}
              />

              <CountryDropdown
                className="info-user"
                valueType="short"
                value={info.country}
                onChange={onChangeInput}
                name=""
              />
              <input
                className="info-user"
                placeholder="Postal code"
                name="Postal_code"
                value={info.postal}
                onChange={onChangeInput}
                type="text"
              />
            </div>
            <Button type="submit" className="send-btn">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UsersInfo;
