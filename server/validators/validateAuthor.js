const { body } = require("express-validator");

const validateAuthor = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Author name cannot be empty.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Author name must be between 2 and 100 characters"),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Country name must be between 2 and 50 characters."),
];

module.exports = validateAuthor;
