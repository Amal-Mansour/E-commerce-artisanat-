import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import bayNow from "../../../assets/bay icon.png";

import "./detaileProducts.css";

function DetailProduct() {
  const params = useParams();

  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isLogged] = state.usersAPI.isLogged;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params, products]);
  console.log(detailProduct);
  if (detailProduct.length === 0) return null;

  return (
    <div className="products-detailt">
      <div className="animation">
        <h6 className="text_animation">
          Promo codes 40% 50% 70% flash sales free delivery
        </h6>
      </div>
      <div className="box-detail">
        <img src={detailProduct.images.url} alt="pro" className="detail-img" />
        <div className="text">
          <h2 className="title-detail">{detailProduct.title}</h2>
          <h2 className="price">$ {detailProduct.price}</h2>
          <p className="description">
            {detailProduct.description}:<br></br>Modern crafts combine design
            with fashion to create new pieces for everyday life.<br></br>{" "}
            Traditional outfits inspire new items of clothing; lovely Bedouin
            fabrics are brought back to life in the form of furniture or
            cushions; blown glass discovers new textures to fit in to
            contemporary interiors. Even village craftsmen and women demonstrate
            a sense of inventiveness, coming up with unusual ideas to combine
            modern uses with authenticity.
          </p>
          <p>Sold:50%</p>

          <div>
          {!isLogged ? 
            <Link to="/login" className="cart">
              <img src={bayNow} alt="bay" width="15%" />
            </Link>
           : 
            <Link to="/cart" className="cart">
              <img src={bayNow} alt="bay" width="15%" />
            </Link>
          }

          
         </div>




        </div>
      </div>
      <div>
        <div className="related-product">
          <h6 className="related_animation ">Related products</h6>
        </div>

        <div className="retated-cart">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
