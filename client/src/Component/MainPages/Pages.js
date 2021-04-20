import React, { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detaileProduct/detaileProduct";
import Login from "./auth/login/Login";
import Register from "./auth/Register/Register";
import Cart from "./cart/Cart";
import Categories from "./category/Category";
import Error from "./Errors";
import { GlobalState } from "../../GlobalState";

function MainPages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.usersAPI.isLogged;
  const [isAdmin] = state.usersAPI.isAdmin;

  return (
    <Switch>
      <Route exact path="/" component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? Error : Login} />
      <Route path="/register" exact component={isLogged ? Error : Register} />
      <Route path="/category" exact component={isAdmin ? Categories : Error} />
      <Route path="/cart" component={Cart} />
      <Route path="/*" component={Error} />
    </Switch>
  );
}

export default MainPages;
