const router = require("express").Router();
const categoryCtrl = require("../Controller/cateroryCrtl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAmin");

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);
module.exports = router;
