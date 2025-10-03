const db = require("./queryDb.js");

exports.allBooksGet = async (_req, res) => {
  try {
    const books = await db.getAllBooks();
    res.render("pages/books", { title: "Books", books: books });
  } catch (err) {
    console.error(err);
  }
};

exports.singleBookGet = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const book = await db.getBookById(bookId);
    res.render("pages/bookDetails", {
      title: "Book Details",
      book: book,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.latestBooksGet = async (_req, res) => {
  try {
    const latestBooks = await db.getLatestBooks(8);
    res.render("pages/index", {
      title: "Home",
      latestBooks: latestBooks,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.editBookGet = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const book = await db.getBookById(bookId);
    res.render("pages/bookForm", {
      title: "Edit Book",
      method: "POST",
      action: `/books/${bookId}/edit`,
      errors: null,
      old: book,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.editBookPost = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const { title, description, publishDate, isbn } = req.body;
    const newBook = {
      title,
      description,
      publishDate,
      isbn,
    };
    await db.updateBook(bookId, newBook);
    console.log(newBook);
  } catch (err) {
    console.error(err);
  }
  res.redirect("/books");
};

exports.deleteBookPost = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    await db.deleteBook(bookId);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
  }
};
