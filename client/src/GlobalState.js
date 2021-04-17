import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./API/ProductsAPI";
import CategoriesAPI from "./API/CategoriesAPI";
import UsersAPI from "./API/UsersAPI";

//
export const GlobalState = createContext();
//
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refresjToken = async () => {
    const res = await axios.get("user/refresh_token");
    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refresjToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    usersAPI: UsersAPI(token),
    categoriesAPI: CategoriesAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
