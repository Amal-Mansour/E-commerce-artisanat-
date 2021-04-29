//const Payment = require("../Controller/PaymentCrtl");
const Users = require("../models/UserModel");
const Payments = require("../models/PayementModel");

const PaymentCrtl = {
  createPayment: async (req, res) => {
    //res.send("test payment");
    try {
      const {
        fname,
        lname,
        email,
        phone,
        adress,
        country,
        city,
        postal,
        paymentID,
      } = req.body;
      const newOrder = await Payments({
        fname,
        lname,
        email,
        phone,
        adress,
        country,
        city,
        postal,
        paymentID,
      });
      if (paymentID)
        return res.status(400).send({ msg: "order already exist" });
      await newOrder.save();
      return res.send("order passed succesfuly");
      //res.send.(newOrder)
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },




  getPaymentsDetail: async (req, res) => {
    
      //res.send(" test get payment");

      try {
        const payments = await Payments.find()
        res.send(payments)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    },

  }
  



module.exports = PaymentCrtl;
