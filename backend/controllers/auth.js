const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../helpers/jwt-helpers.js");
const { OAuth2Client } = require("google-auth-library");

const googleLogin = async (req = request, res = response) => {
  
  try {
    const { credential } = req.body;
    const clientid = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientid);
    await client
      .verifyIdToken({ idToken: credential, audience: clientid })
      .then(async (response) => {
        console.log(response);
        const { email_verified, given_name, family_name, email, picture } =
          response.payload;
        if (!email_verified) {
          res.status(400).json({
            msg: "Something went wrong",
          });
        }
        const user = await User.findOne({ email });
        if (user) {
          const token = await createJWT(user.id);
          res.json({
            token,
            user,
          });
        } else {
          const password = email + process.env.SECRETKEY;
          const newUser = new User({
            email,
            name: given_name,
            lastname: family_name,
            password,
            google: true,
            picture,
          });
          newUser.save();
        }
        console.log(response.payload);
      });
  } catch (err) {
    console.log(err);
  }
};
const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User doesn't exists",
      });
    }

    const status = user.status;
    if (!status) {
      return res.status(400).json({
        msg: `User isn't longer available.`,
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password isn't correct, try again.",
      });
    }
    const token = await createJWT(user.id);
    res.json({
      msg: "Login ok",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Incorrect user or password, try again",
    });
  }
};

module.exports = { login, googleLogin };
