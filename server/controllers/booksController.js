const db = require("./queryDb.js");

exports.allBooksGet = async (req, res) => {
  try {
    const books = await db.getAllBooks();
    res.render("pages/books", { title: "Books", books: books });
  } catch (err) {
    console.error(err);
  }
};
