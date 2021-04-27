import React from "react";
import { Link } from "react-router-dom";
import "./History.css";

function History() {
  const style = {
    width: "80%",
  };
  return (
    <div className="history-page">
      <h4 className="hitory">You have ordered :</h4>

      <table style={style}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of command </th>
            <th>Total</th>
            <th>The Bill</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>608189dac8574d09d4819e3f</td>
            <td>24 April 2021</td>
            <td>$ 350</td>
            <td>
              <Link to={`/Facture`}>View</Link>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>6080a05edada1d2a18cba296</td>
            <td>25 April 2021</td>
            <td>$ 80</td>
            <td>
              <Link to={`/Facture`}>View</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default History;
