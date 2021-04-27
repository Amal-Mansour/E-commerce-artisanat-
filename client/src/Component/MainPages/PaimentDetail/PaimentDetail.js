import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./PaimentDetail.css";
import Cash from "../../../assets/Cash.jpg";
import Credit from "../../../assets/credit card.jpg";
import Smart from "../../../assets/e-dinnar.png";
import { Link } from "react-router-dom";

function PaimentDetail() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="paymentDetail">
      <Button className="bay-button" variant="primary" onClick={handleShow}>
        Pay Now
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose your payement:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to="/set_Information">
            <img src={Cash} alt="cash" className="img-fluid" />
          </Link>
          <span className="payment_title"> Payment Cash on delivery </span>

          <br />
          <hr />
          <img src={Credit} alt="credit" className="img-fluid" />
          <span className="payment_title"> Payment by Credit Card </span>
          <br />
          <hr />
          <img src={Smart} alt="smart" className="img-fluid" />
          <span className="payment_title"> Payment by E-Dinar smart </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PaimentDetail;
