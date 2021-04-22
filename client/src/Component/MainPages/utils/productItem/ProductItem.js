import React from "react";
import { Card } from "react-bootstrap";
import BtnRender from "./BtnRender";

import "./ProductItem.css";
function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <Card style={{ width: "18rem" }} className="product-card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
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
        <BtnRender product={product} deleteProduct={deleteProduct} />
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
