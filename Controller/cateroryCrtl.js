const Category = require("../models/CategoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.send(categories);
    } catch (error) {
      return res.status(500).send({ msg: error.messages });
    }
  },

  createCategory: async (req, res) => {
    // if user have role = 1 ---> admin
    // only admin can create , delete and update category
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      const newCategory = new Category({ name });
      await newCategory.save(req.body);
      res.json({ msg: "Created a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id });
      if (products)
        return res.status(400).send({
          msg: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params._id }, { name });

      res.send({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
