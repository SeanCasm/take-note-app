const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleLogin } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();
router.post("/oauth", googleLogin);
router.post(
  "/mongo",
  [
    check("email", "The email is required").notEmpty(),
    check("password", "The password is required").notEmpty(),
    check("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
    check("email").isEmail(),
    validateFields,
  ],
  login
);
module.exports = router;
