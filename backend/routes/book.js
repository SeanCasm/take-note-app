const { Router } = require("express");
const { check } = require("express-validator");
const {
  bookPost,
  bookDelete,
  bookGet,
  bookEdit,
  bookGetAll,
} = require("../controllers/book");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { bookExists } = require("../helpers/db-validators");

const router = Router();

router.get("/all", [validateJWT], bookGetAll);

router.get(
  "/list",
  [check("id", "Book id is required").notEmpty(), validateJWT, validateFields],
  bookGet
);
router.post(
  "/",
  [
    validateJWT,
    check("title", "Book title is required").notEmpty(),
    check("title").custom(bookExists),
    check("title", "Book title mustn't have more than 20 characters").isLength({
      max: 20,
    }),
    validateFields,
  ],
  bookPost
);

router.patch("/", [validateJWT, validateFields], bookEdit);

router.delete(
  "/collection",
  [validateJWT, validateFields, check("id", "Book id is required").notEmpty()],
  bookDelete
);

module.exports = router;
