const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("Database online");
  } catch (err) {
    console.log(err);
    throw new Error("Failed database connection");
  }
};

module.exports = dbConnection;
