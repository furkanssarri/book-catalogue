const pool = require("../db/pool.js");

async function getAllBooks() {
  const { rows } = await pool.query(`
SELECT 
  b.book_id,
  b.title,
  b.description,
  b.publish_date,
  b.isbn,
  ARRAY_AGG(DISTINCT a.name) AS authors,
  ARRAY_AGG(DISTINCT g.genre_name) AS genres
FROM books b
LEFT JOIN book_authors ba ON b.book_id = ba.book_id
LEFT JOIN authors a ON ba.author_id = a.author_id
LEFT JOIN book_genres bg ON b.book_id = bg.book_id
LEFT JOIN genres g ON bg.genre_id = g.genre_id
GROUP BY b.book_id;`);
  return rows;
}

async function getBookById(id) {
  const { rows } = await pool.query(
    `
SELECT
        b.book_id,
        b.title,
        b.description,
        b.publish_date,
        b.isbn,
        ARRAY_AGG(DISTINCT a.name) AS authors,
        ARRAY_AGG(DISTINCT g.genre_name) AS genres
      FROM books b
      LEFT JOIN book_authors ba ON b.book_id = ba.book_id
      LEFT JOIN authors a ON ba.author_id = a.author_id
      LEFT JOIN book_genres bg ON b.book_id = bg.book_id
      LEFT JOIN genres g ON bg.genre_id = g.genre_id
      WHERE b.book_id = $1
      GROUP BY b.book_id
`,
    [id],
  );
  return rows[0];
}

async function getLatestBooks(limitNumber) {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM books 
      ORDER BY created_at DESC 
      LIMIT ($1);
`,
      [limitNumber],
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllAuthors() {
  const { rows } = await pool.query(`SELECT * FROM authors;`);
  return rows;
}

async function getSingleAuthor(id) {
  const { rows } = await pool.query(
    `SELECT * FROM authors WHERE author_id=($1)`,
    [id],
  );
  return rows[0];
}

module.exports = {
  getAllBooks,
  getBookById,
  getLatestBooks,
  getAllAuthors,
  getSingleAuthor,
};
