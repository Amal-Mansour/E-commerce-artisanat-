import { useState, useEffect } from "react";
import axios from "axios";

function PaymentsAPI(){
    const [payments, setPayments] = useState([]);
    //const [callback, setCallback] = useState(false);
  
 useEffect(() => {
     
    const getPaymentDetails = async () =>{
        const res = await axios.get('/api/payment')
        //console.log(res)

        setPayments(res)
    };
    getPaymentDetails()
     
 }, [])


 return{
     payments: [payments, setPayments],
     //callback:[callback, setCallback] 


 }








}


export default PaymentsAPI;
