const { Router } = require("express");
const { check } = require("express-validator");
const {
  notePost,
  noteDelete,
  noteEdit,
  getNotes,
  searchNote,
} = require("../controllers/note");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/list", [validateJWT, validateFields], getNotes);
router.get(
  "/list-search",
  [
    validateJWT,
    check("user").isMongoId().notEmpty(),
    check("title", "Note title is required").notEmpty(),
    validateFields,
  ],
  searchNote
);

router.post(
  "/",
  [
    validateJWT,
    check("title", "Your note must have a title").notEmpty(),
    check(
      "title",
      "Note title must have equal or less than 35 characters"
    ).isLength({
      max: 35,
    }),
    check(
      "content",
      "Content must have equal or less than 2000 characters"
    ).isLength({
      max: 2000,
    }),
    check("book", "Your note must have a book").notEmpty(),

    validateFields,
  ],
  notePost
);

router.patch(
  "/",
  [
    validateJWT,
    check("id", "Note id cannot be empty").notEmpty(),
    check(
      "title",
      "Note title must have equal or less than 35 characters"
    ).isLength({
      max: 35,
    }),
    validateFields,
  ],
  noteEdit
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Note id required").notEmpty(),
    check("book", "Book id required").notEmpty(),
  ],
  noteDelete
);

module.exports = router;
