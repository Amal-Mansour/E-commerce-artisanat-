import React from "react";
import { DataProvider } from "./GlobalState";
import Header from "./Component/Header/Header";
import MainPages from "./Component/MainPages/Pages";
import Search from "./Component/MainPages/products/Filter";
import "./App.css";
function App() {
  return (
    <DataProvider>
      <Header />
      <Search />
      <MainPages />
    </DataProvider>
  );
}

export default App;
