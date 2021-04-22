const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).send({ msg: "email already exists" });
      if (password.length < 6)
        return res
          .status(400)
          .send({ msg: "password should be at least 6 characters" });
      // bcrypt password
      const HashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: HashedPassword,
      });
      // save the users data in mongodb
      await newUser.save();
      //create the acess token by json web token to authentification
      const accesstoken = createAccessToken({ _id: newUser._id });
      const refreshtoken = createRefreshToken({ _id: newUser._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      res.send({ accesstoken });
      // res.send({ msg: "Register succsess" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).send({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send({ msg: "Bad Credential." });

      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "Bad Credential" }] });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.send({ msg: "logged out" });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },

  refreshtoken: (req, res) => {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).send({
        msg: "please Login or Register",
      });
    jwt.verify(rf_token, process.env.REFRECH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).send({
          msg: "please Login or Register",
        });
      const accesstoken = createAccessToken({ id: user.id });
      res.send({ user, accesstoken });
    });
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).send({ msg: "user does not exist!!!" });
      res.send(user);
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "11m",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRECH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = userCtrl;
