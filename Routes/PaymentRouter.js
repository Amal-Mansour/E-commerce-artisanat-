const router = require("express").Router();
const paymentCrtl = require("../Controller/PaymentCrtl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentCrtl.getPayments)
  .post(auth, paymentCrtl.createPayment);

module.exports = router;
