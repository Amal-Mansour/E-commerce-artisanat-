const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const PaymentCrtl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.send(payments);
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).send({ msg: "User does not exist." });

      const { cart, paymentID, fname, lname, email, phone, address } = req.body;

      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        fname,
        lname,
        email,
        phone,
        cart,
        paymentID,
        address,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();
      res.send({ msg: "Payment Succes!" });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = PaymentCrtl;
