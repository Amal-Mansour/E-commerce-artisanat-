const router = require("express").Router();
const categoryCtrl = require("../Controller/categoryCrtl");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAmin");

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post( categoryCtrl.createCategory);

router
  .route("/category/:id")
  .delete( categoryCtrl.deleteCategory)
  .put( categoryCtrl.updateCategory);
module.exports = router;
