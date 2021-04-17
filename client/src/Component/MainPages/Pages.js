import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detaileProduct/detaileProduct";
import Login from "./auth/login/Login";
import Register from "./auth/Register/Register";
import Cart from "./cart/Cart";
import Error from "./Errors";

const MainPages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cart" component={Cart} />
      <Route path="/*" component={Error} />
    </Switch>
  );
};

export default MainPages;
