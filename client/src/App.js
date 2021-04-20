import React from "react";
import { DataProvider } from "./GlobalState";
import Header from "./Component/Header/Header";
import MainPages from "./Component/MainPages/Pages";

import "./App.css";
function App() {
  return (
    <DataProvider>
      <Header />
      <MainPages />
    </DataProvider>
  );
}

export default App;
