import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import bayNow from "../../../assets/bay now.png";
import { Link } from "react-router-dom";
import "./Cart.css";
function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.usersAPI.cart;
  const [total, setTotal] = useState(0);

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>cart empty</h2>
    );
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="detail-cart">
          <img src={product.images.url} alt="pro" className="detail-img" />
          <div className="text">
            <h2 className="title-detail">{product.title}</h2>
            <h3 className="price">$ {product.price * product.quantity}</h3>
            <p className="description">
              {product.description}:<br></br>Modern crafts combine design with
              fashion to create new pieces for everyday life.<br></br>{" "}
              Traditional outfits inspire new items of clothing; lovely Bedouin
              fabrics are brought back to life in the form of furniture or
              cushions; blown glass discovers new textures to fit in to
              contemporary interiors. Even village craftsmen and women
              demonstrate a sense of inventiveness, coming up with unusual ideas
              to combine modern uses with authenticity.
            </p>
            <div className="amount">
              <button> + </button>
              <span>{product.quantity}</span>
              <button> - </button>
            </div>

            <div className="delete">X</div>

            <div className="total">
              <h3>Total : $ {total}</h3>
              <Link to="#!">payement</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
