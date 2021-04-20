const Category = require("../models/CategoryModel");
const Products = require("../models/ProductModel");

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
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).send({ msg: "This category already exists." });

      const newCategory = new Category({ name });

      await newCategory.save();
      return res.send({ msg: "Created a category" });
    } catch (err) {
      return res.status(400).send({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id });
      if (products)
        return res.status(400).json({
          msg: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.send({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      res.send({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
