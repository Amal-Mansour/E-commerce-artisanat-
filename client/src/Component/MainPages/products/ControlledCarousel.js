import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import labop from "../../../assets/lapsotp withpannier.jpg";
import Black from "../../../assets/black.jpg";
import Promo from "../../../assets/big sale.jpg";
import Shopping from "../../../assets/shopping.jpg";
import "./Products.css";
function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="slide_continer"
      >
        <Carousel.Item>
          <img className="slide_show" src={labop} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="slide_show" src={Black} alt="Second slid" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="slide_show" src={Promo} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="slide_show" src={Shopping} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
