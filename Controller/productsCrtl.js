const Products = require("../models/ProductModel");

//Filter, Soritng and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  // regex symbole
  //    gte = greater than or equal
  //    lte = lesser than or equal
  //    lt = lesser than
  //    gt = greater than

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

////////////////////////////// function about CRUD  execute only be admin//////////////////////////////////
const productCrtl = {
  getProducts: async (req, res) => {
    try {
      console.log(req.query);
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.send({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).send({ msg: "No image upload" });
      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).send({ msg: "this product already exists" });
      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      res.send({ msg: "created successefuly" });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.send({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).send({ msg: "No image upload" });
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      res.send({ msg: "Update a Product" });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },
};

module.exports = productCrtl;
