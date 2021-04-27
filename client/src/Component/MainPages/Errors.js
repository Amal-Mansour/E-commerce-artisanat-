import React from "react";
import notFound from "../../assets/err.jpg";

const Errors = () => {
  const imgstyle = {
    with: "2550px",
    height: "760px",
    paddingLeft: "170px",
  };
  return (
    <div>
      <img style={imgstyle} src={notFound} alt="error" />
    </div>
  );
};

export default Errors;
