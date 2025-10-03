const db = require("./queryDb");

exports.allGenresGet = async (_req, res) => {
  try {
    const allGenres = await db.getAllGenres();
    res.render("pages/genres", { title: "Genres", genres: allGenres });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.filterByGenre = async (req, res) => {
  try {
    const genreId = parseInt(req.params.genreId, 10);
    if (isNaN(genreId)) return res.status(400).send("Invalid Genre");
    const { filteredBooks, genre_name } = await db.getBooksByGenre(genreId);
    res.render("pages/books", {
      title: `Books by genre ${genre_name || "Selected Genre"}`,
      books: filteredBooks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
