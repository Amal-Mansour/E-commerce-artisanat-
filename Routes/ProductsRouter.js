const router = require("express").Router();
const productCrtl = require("../Controller/productsCrtl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAmin");

router
  .route("/products")
  .get(productCrtl.getProducts)
  .post(authAdmin, productCrtl.createProduct);

router
  .route("/products/:id")
  .delete(auth,authAdmin, productCrtl.deleteProduct)
  .put(auth,authAdmin, productCrtl.updateProduct);

module.exports = router;
