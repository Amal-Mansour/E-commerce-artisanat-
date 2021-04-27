import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { Button } from "react-bootstrap";
import PaimentDetail from "../PaimentDetail/PaimentDetail";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.usersAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (
      (toast.warn("this product will completly  deleted from cart"),
      {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
      })
    ) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  //const tranSuccess = async (payment) => {
  //  console.log(payment);
  //};

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>cart empty</h2>
    );
  }

  return (
    <div>
      <div className="total">
        <h3>Total : $ {total}</h3>
        <PaimentDetail />

        {/*<PaypalButton total={total} tranSuccess={tranSuccess} />*/}
      </div>

      {cart.map((product) => (
        <div className="detail-cart" key={product._id}>
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
              <Button
                variant="info"
                className="btn"
                onClick={() => increment(product._id)}
              >
                {" "}
                +{" "}
              </Button>
              <span>{product.quantity}</span>
              <Button
                variant="info"
                className="btn"
                onClick={() => decrement(product._id)}
              >
                {" "}
                -{" "}
              </Button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
