const db = require("./queryDb.js");

exports.allAuthorsGet = async (req, res) => {
  try {
    const authors = await db.getAllAuthors();
    res.render("pages/authors", { title: "All authors", authors: authors });
  } catch (err) {
    console.error(err);
  }
};

exports.singleAuthorGet = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const author = await db.getSingleAuthor(authorId);
    res.render("pages/authorDetails", {
      title: "Author Details",
      author: author,
    });
  } catch (err) {
    console.error(err);
  }
};
