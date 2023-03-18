const { Router } = require("express");
const { check } = require("express-validator");
const { userPost } = require("../controllers/user");
const { emailExists } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email isn't  valid").isEmail(),
    check(["name", "lastname", "email", "password"]).notEmpty(),
    check("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
    check("email").custom(emailExists),
    validateFields,
  ],
  userPost
);

module.exports = router;
