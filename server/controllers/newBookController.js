const db = require("./queryDb.js");
const { body, validationResult } = require("express-validator");

exports.newBookFormGet = async (_req, res) => {
  try {
    res.render("pages/bookForm", {
      title: "Add New Book",
      errors: null,
      old: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error retrieving the 'New Book Form'");
  }
};

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

exports.newBookPost = [
  validateBook,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/bookForm", {
          title: "Add New Book",
          errors: errors.mapped(),
          old: req.body,
        });
      }
      await db.createBook(req.body);
    } catch (err) {
      console.error(err);
    }
    res.redirect("/books");
  },
];
