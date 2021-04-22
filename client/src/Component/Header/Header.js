import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "../../assets/bars-solid (1).svg";
import Close from "../../assets/times-solid (1).svg";
import Cart from "../../assets/shopping-cart-solid.svg";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import "./Header.css";
function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.usersAPI.isLogged;
  const [isAdmin] = state.usersAPI.isAdmin;
  const [cart] = state.usersAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };
  const adminRouter = () => {
    return (
      <>
        <NavLink to="/create_product" className="link">
          Create Product
        </NavLink>

        <NavLink to="/category" className="link">
          Categories
        </NavLink>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <NavLink to="/history" className="link">
          History
        </NavLink>

        <NavLink to="/" className="link" onClick={logoutUser}>
          logout
        </NavLink>
      </>
    );
  };

  return (
    <header>
      <Navbar className="nav-container">
        <div className="menu">
          <img src={Menu} alt="menu" width="30" />
        </div>
        <Link to="/" className="title">
          {isAdmin ? "ADMIN" : "LemDina ShoP"}
        </Link>

        <Nav className="mr-auto">
          <NavLink to="/" className="link">
            {isAdmin ? "Products" : "Shop"}
          </NavLink>
          {isAdmin && adminRouter()}

          {isLogged ? (
            loggedRouter()
          ) : (
            <NavLink to="/login" className="link">
              Register ✥ Login
            </NavLink>
          )}
        </Nav>

        <div className="menu">
          <img src={Close} alt="close" width="30" />
        </div>

        {isAdmin ? (
          ""
        ) : (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={Cart} alt="cart" width="30" />
            </Link>
          </div>
        )}
      </Navbar>
    </header>
  );
}

export default Header;

/*<NavDropdown title="Category" className="category">
            <NavDropdown.Item href="#action/3.1">
              Carpet & Textile
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              pottery & ceramics
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Jwelery</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */

//          </NavDropdown>*/}
//// {
//   categories.map(category => (
//       <option value={"category=" + category._id} key={category._id}>
//           {category.name}
//       </option>
//   ))
// }
