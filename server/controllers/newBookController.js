const db = require("./queryDb.js");
const { validationResult } = require("express-validator");
const validateBook = require("../validators/bookValidator.js");

exports.newBookFormGet = async (_req, res) => {
  try {
    res.render("pages/bookForm", {
      title: "Add New Book",
      method: "POST",
      action: "newbook",
      errors: null,
      old: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error retrieving the 'New Book Form'");
  }
};

exports.newBookPost = [
  validateBook,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/bookForm", {
          title: "Add New Book",
          method: "POST",
          action: "/newbook",
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
