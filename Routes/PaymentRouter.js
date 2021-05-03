const router = require("express").Router();
const paymentCrtl = require("../Controller/PaymentCrtl");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAmin");

router
  .route("/payment")

  .post(paymentCrtl.createPayment)
  .get(paymentCrtl.getPaymentsDetail);

module.exports = router;
