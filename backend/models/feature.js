const { Schema, model } = require("mongoose");

const FeatureSchema = Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  icon: {
    type: String,
  },
});

FeatureSchema.methods.toJSON = function () {
  const { __v, _id, ...feature } = this.toObject();
  feature.fid = _id;
  return feature;
};

module.exports = model("Feature", FeatureSchema);
