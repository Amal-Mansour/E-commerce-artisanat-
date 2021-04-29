import React, { useContext,useEffect} from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import "../history/History.css";

function PaymentAdmin() {
  const state = useContext(GlobalState);
  const [payments, setPayments] = state.paymentsAPI.payments;
  const [isAdmin] = state.usersAPI.isAdmin;
  const [token] = state.token;


  
  useEffect(() => {
    if(token){
        const getOrdertDetails = async() =>{
            if(isAdmin){
                const res = await axios.get('/api/payment', {
                    headers: {Authorization: token}
                })
                //setPayments(res.data)
                console.log(res)
            }
        }
        getOrdertDetails()
    }
},[token, isAdmin, setPayments])


 

  const style = {
    width: "80%",
  };
  return (
    <div className="history-page">
      <h4 className="hitory">You have new ordered :</h4>

     {  payments.map( payment =>{return(
       
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
            <td>{payment._id}</td>
            <td>{payment.fname}</td>
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
      )})}
    </div>
  );
}

export default PaymentAdmin;
