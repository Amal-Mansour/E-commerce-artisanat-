import React, {  useState } from "react";
//import { GlobalState } from "../../../GlobalState";
import { Button } from "react-bootstrap";
//import { CountryDropdown } from "react-country-region-selector";
import axios from "axios";
import "./UserInfo.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersInfo() {
 
  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    adress: "",
    country: "",
    city: "",
    postal: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const paymentSubmit = async (e) => {
    e.preventDefault();
    console.log(info);

    try {
     await axios.post("/api/payment", { ...info });
      
      window.location.href = "/cart";
      toast.success("order passed sucssefuly", {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      });
    } catch (err) {
      alert('order failed');
    }
  };


  return (
    <div className="users">
      <div>
        <div className="usersInfo">
          <form className="formPaiment" onSubmit={paymentSubmit}>
            <div className="display-name">
              <input
                className="info-user"
                placeholder="First name"
                name="fname"
                value={info.fname}
                onChange={handleChange}
                type="text"
              />
              <input
                className="info-user"
                placeholder="Last name"
                name="lname"
                value={info.lanme}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="display-contact">
              <input
                className="info-user"
                placeholder="Phone"
                name="phone"
                value={info.phone}
                onChange={handleChange}
                type="text"
              />
              <input
                className="info-user"
                placeholder="Email"
                name="email"
                value={info.email}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="adress">
              <textarea
                className="info-user"
                placeholder="Adress"
                name="adress"
                value={info.adress}
                onChange={handleChange}
                type="text"
                rows={3}
              />

              <input
                className="info-user"
                placeholder="Country"
                valueType="short"
                value={info.country}
                onChange={handleChange}
                name="country"
              />
              <input
                className="info-user"
                placeholder="City"
                valueType="short"
                value={info.city}
                onChange={handleChange}
                name="city"
              />
              <input
                className="info-user"
                placeholder="Postal code"
                name="postal"
                value={info.Postal_code}
                onChange={handleChange}
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
