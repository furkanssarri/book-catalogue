const db = require("./queryDb.js");

exports.allBooksGet = async (req, res) => {
  try {
    const books = await db.getAllBooks();
    res.render("pages/books", { title: "Books", books: books });
  } catch (err) {
    console.error(err);
  }
};

exports.singleBookGet = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const book = await db.getBookById(bookId);
    res.render("pages/bookDetails", {
      title: "Book Details",
      book: book,
    });
  } catch (err) {
    console.error(err);
  }
};
