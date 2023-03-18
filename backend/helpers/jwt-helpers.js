const jwt = require("jsonwebtoken");

const createJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token cannot been created");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  createJWT,
};
