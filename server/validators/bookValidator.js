const { body } = require("express-validator");

const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters."),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Author name must be between 2 and 100 characters."),
  body("description").trim().notEmpty().withMessage("Description is required."),
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Genre must be between 2 and 50 characters."),
  body("isbn")
    .trim()
    .customSanitizer((value) => value.replace(/-/g, ""))
    .isLength({ min: 10, max: 13 })
    .withMessage("ISBN must be 10 or 13 digits.")
    .matches(/^\d{9}[\dXx]$|^\d{13}$/)
    .withMessage(
      "ISBN must contain only digits (10 or 13 total) and optionel hyphens in between",
    ),
];

module.exports = validateBook;
