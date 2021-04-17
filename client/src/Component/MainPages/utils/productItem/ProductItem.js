import React from "react";
import { Card } from "react-bootstrap";
import BtnRender from "./BtnRender";
//import { Form } from "react-bootstrap";
import "./ProductItem.css";
function ProductItem({ product, isAdmin }) {
  return (
    <Card style={{ width: "18rem" }} className="product-card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          className="check-box"
        />
      )}
      <Card.Img
        variant="top"
        src={product.images.url}
        alt="product"
        className="image"
      />
      <Card.Body>
        <Card.Text className="title-card">{product.title}</Card.Text>
        <Card.Text className="price">${product.price}</Card.Text>
        <BtnRender product={product} />
      </Card.Body>
    </Card>
  );
}

export default ProductItem;

{
  /*<div className="style-icon">
          <Link to="/cart">
            <img src={Cart} alt="cart" width="20%" />
          </Link>
          <Link to={`/detail/${product._id}`}>
            {" "}
            <img src={heart} alt="heart" width="20%" className="heart" />
          </Link>
        </div>*/
}
