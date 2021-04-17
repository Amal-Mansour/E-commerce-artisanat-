import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import bayNow from "../../../assets/bay now.png";
import "./detaileProducts.css";

function DetailProduct() {
  const params = useParams();
  console.log(params);
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  //  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);
  // //
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
          {/* <p>Sold: {detailProduct.sold}</p> */}

          <Link to="/cart" className="cart">
            <img src={bayNow} alt="bay" width="15%" />
          </Link>
        </div>
      </div>
      <div>
        <h2>Related products:</h2>
        <div className="retated-products">
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
