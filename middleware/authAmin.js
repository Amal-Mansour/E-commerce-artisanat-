const Users = require("../models/UserModel");

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Users.findOne({
      _id: req.user._id,
    });
    if (user.role === 0)
      return res.status(400).send({ msg: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports = authAdmin;