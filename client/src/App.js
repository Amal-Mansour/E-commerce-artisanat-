import React from "react";
import { DataProvider } from "./GlobalState";
import Header from "./Component/Header/Header";
import MainPages from "./Component/MainPages/Pages";
import Footer from "./Component/Footer/Footer";

import "./App.css";
function App() {
  return (
    <DataProvider>
      <Header />
      <MainPages />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </DataProvider>
  );
}

export default App;
