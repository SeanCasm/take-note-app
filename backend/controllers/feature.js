const { response, request } = require("express");
const Feature = require("../models/feature");
const getFeatures = async (req = request, res = response) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot get features, please try again",
    });
  }
};

module.exports = {
  getFeatures,
};
