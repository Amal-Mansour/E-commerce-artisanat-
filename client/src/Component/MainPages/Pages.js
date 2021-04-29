import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detaileProduct/detaileProduct";
import Login from "./auth/login/Login";
import Register from "./auth/Register/Register";
import Cart from "./cart/Cart";
import Categories from "./category/Category";
import CreateProducts from "./createProduct/CreateProducts";
//import UsersInfo from "./PaimentDetail/UsersInfo";
//import History from "./history/History";
import PaymentAdmin from "./PaimentDetail/PaymentAdmin";

import Error from "./Errors";
import { GlobalState } from "../../GlobalState";

function MainPages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.usersAPI.isLogged;
  const [isAdmin] = state.usersAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? Error : Login} />
      <Route path="/register" exact component={isLogged ? Error : Register} />
      <Route path="/category" exact component={isAdmin ? Categories : Error} />
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProducts : Error}
      />
      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProducts : Error}
      />
      {/*<Route path="/set_Information"exact component={isLogged ? UsersInfo : Error} />
      <Route path="/Payments_Detail" exact component={isLogged ? History : Error} />*/}
      {/*<Route
        path="/Payment_detail"
        component={isAdmin ? PaymentAdmin : Error}
      />*/}
      <Route path="/cart" exact component={Cart} />
      <Route path="/*" exact component={Error} />
    </Switch>
  );
}

export default MainPages;
