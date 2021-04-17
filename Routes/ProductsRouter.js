const router = require("express").Router();
const productCrtl = require("../Controller/productsCrtl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAmin");

router
  .route("/products")
  .get(productCrtl.getProducts)
  .post(productCrtl.createProduct);

router
  .route("/products/:id")
  .delete(productCrtl.deleteProduct)
  .put(productCrtl.updateProduct);

module.exports = router;
