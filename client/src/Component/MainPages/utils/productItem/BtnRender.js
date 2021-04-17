import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import heart from "../../../../assets/coeur.png";
import Cart from "../../../../assets/panier.png";
import Edit from "../../../../assets/edit.png";
import delet from "../../../../assets/delete.jpg";

function BtnRender({ product }) {
  const state = useContext(GlobalState); //
  const [isAdmin] = state.usersAPI.isAdmin;
  const addCart = state.usersAPI.addCart;
  return (
    <div>
      <div className="style-icon">
        {isAdmin ? (
          <>
            <Link to={`/edit_product/${product._id}`}>
              <img src={Edit} alt="cart" width="20%" />
            </Link>
            <Link>
              {" "}
              <img src={delet} alt="heart" width="20%" className="heart" />
            </Link>
          </>
        ) : (
          <>
            <Link to="#!" onClick={() => addCart(product)}>
              <img src={Cart} alt="cart" width="20%" />
            </Link>
            <Link to={`/detail/${product._id}`}>
              {" "}
              <img src={heart} alt="heart" width="20%" className="heart" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default BtnRender;

// to={`/edit_product/${product._id}`}
