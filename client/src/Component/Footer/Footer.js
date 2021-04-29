import React from "react";

const Footer = () => {
  const stylefooter = {
    backgroundColor: "#ff7171",
    color: "white",
    borderRadius: "10px",
    //position: "fixed",
    marginBottom: "0%",
    marginTop: "1650px",
    marginLeft: "470px",
  };
  return (
    <div className="foouter-poistion">
      <span style={stylefooter}>
        Copyright © 2021, Artisanat E-commerce App Made by AMAL MANSOUR student
        at GoMyCode
      </span>
    </div>
  );
};

export default Footer;
