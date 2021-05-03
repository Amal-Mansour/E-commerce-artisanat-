import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "../../assets/bars-solid (1).svg";
import Close from "../../assets/times-solid (1).svg";
import Cart from "../../assets/shopping-cart-solid.svg";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Logo from "../../assets/myLogo.png";
import "./Header.css";
function Header() {
  const state = useContext(GlobalState);
  //console.log(state) 
  const [isLogged] = state.usersAPI.isLogged;
  const [isAdmin] = state.usersAPI.isAdmin;
  const [cart] = state.usersAPI.cart;
  const [menu, setMenu] = useState(false);




  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };



  const adminRouter = () => {
    return (
      <>
        <NavLink
          to="/create_product"
          className="link"
          activeClassName="is-active"
          exact={true}
        >
          Create Product
        </NavLink>

        <NavLink to="/category" className="link" activeClassName="is-active" exact={true}>
          Categories
        </NavLink>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <NavLink
          to="/Payments_Detail"
          className="link"
          activeClassName="is-active"
          exact={true}
        >
          Payments Detail
        </NavLink>

        <NavLink to="/" className="link" exact={true} onClick={logoutUser}>
          logout
        </NavLink>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <Navbar className="nav-container">
        <div className="menu">
          <img src={Menu} alt="menu" width="20" onClick={() => setMenu(!menu)} />
        </div>
        <img src={Logo} alt="logo" className="logo_style" />
        <NavLink to="/" className="title">
          {isAdmin ? "ADMIN" : "LemDina ShoP"}
        </NavLink>

        <Nav className="mr-auto">
          <NavLink
            style={styleMenu}
            to="/"
            className="link"
            activeClassName="is-active"
            exact={true}
          >
            {isAdmin ? "Products" : "Shop"}
          </NavLink>
          {isAdmin && adminRouter()}

          {isLogged ? (
            loggedRouter()
          ) : (
            <NavLink
              to="/login"
              className="link"
              activeClassName="is-active"
              exact={true}
            >
              Register ✥ Login
            </NavLink>
          )}
        </Nav>

        

        {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span> 
                    
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
      </Navbar>
    </header>
  );
}

export default Header;
