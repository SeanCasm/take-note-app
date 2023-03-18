const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const userPost = async (req = request, res = response) => {
  try {
    const { name, lastname, password, email } = req.body;
    const joinDate = new Date().toISOString();
    const user = new User({ name, lastname, email, password, joinDate });
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
 
    res.json(user);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot post user, please try again",
    });
  }
};

module.exports = {
  userPost,
};
