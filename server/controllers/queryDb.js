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

async function getAllGenres() {
  try {
    const { rows } = await pool.query(`SELECT * FROM genres;`);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getBooksByGenre(genreId) {
  const { rows } = await pool.query(
    `
    SELECT 
      b.book_id,
      b.title,
      b.description,
      b.publish_date,
      b.isbn,
      ARRAY_AGG(DISTINCT a.name) AS authors,
      g.genre_name
    FROM books b
    LEFT JOIN book_authors ba ON b.book_id = ba.book_id
    LEFT JOIN authors a ON ba.author_id = a.author_id
    LEFT JOIN book_genres bg ON b.book_id = bg.book_id
    LEFT JOIN genres g ON bg.genre_id = g.genre_id
    WHERE g.genre_id = $1
    GROUP BY b.book_id, g.genre_name
    ORDER BY b.title;
  `,
    [genreId],
  );

  const genre_name = rows[0]?.genre_name || null; // safe fallback
  return { filteredBooks: rows, genre_name };
}

async function getBooksByAuthor(authorId) {
  try {
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
    JOIN book_authors ba ON b.book_id = ba.book_id
    JOIN authors a ON ba.author_id = a.author_id
    LEFT JOIN book_genres bg ON b.book_id = bg.book_id
    LEFT JOIN genres g ON bg.genre_id = g.genre_id
    WHERE a.author_id = $1
    GROUP BY b.book_id
    ORDER BY b.title;
    `,
      [authorId],
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function createBook({
  title,
  description,
  publish_date,
  author,
  genre,
  isbn,
}) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // start transaction

    // --- 1. Insert or get author ---
    const { rows: authorRows } = await client.query(
      `
      INSERT INTO authors (name)
      VALUES ($1)
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING author_id
      `,
      [author],
    );
    const authorId = authorRows[0].author_id;

    // --- 2. Insert or get genre ---
    const { rows: genreRows } = await client.query(
      `
      INSERT INTO genres (genre_name)
      VALUES ($1)
      ON CONFLICT (genre_name) DO UPDATE SET genre_name = EXCLUDED.genre_name
      RETURNING genre_id
      `,
      [genre],
    );
    const genreId = genreRows[0].genre_id;

    // --- 3. Insert book ---
    const { rows: bookRows } = await client.query(
      `
      INSERT INTO books (title, description, publish_date, isbn)
      VALUES ($1, $2, $3, $4)
      RETURNING book_id
      `,
      [title, description, publish_date, isbn],
    );
    const bookId = bookRows[0].book_id;

    // --- 4. Insert into junction tables ---
    await client.query(
      `INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)`,
      [bookId, authorId],
    );

    await client.query(
      `INSERT INTO book_genres (book_id, genre_id) VALUES ($1, $2)`,
      [bookId, genreId],
    );

    // --- Commit transaction ---
    await client.query("COMMIT");

    return bookId; // optionally return book ID
  } catch (err) {
    await client.query("ROLLBACK"); // undo everything if any step fails
    throw err;
  } finally {
    client.release();
  }
}

async function updateBook(id, { title, description, publish_date, isbn }) {
  try {
    const { rows } = pool.query(
      `
      UPDATE books
      SET title = ($1), description = ($2), publish_date = ($3), isbn = ($4)
      WHERE book_id = ($5)
`,
      [title, description, publish_date, isbn, id],
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function deleteBook(id) {
  try {
    await pool.query(`DELETE FROM books WHERE book_id = ($1)`, [id]);
  } catch (err) {
    console.error(err);
  }
}

async function addNewAuthor({ name, country, bio }) {
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO authors (name, country, bio)
      VALUES ($1, $2, $3)
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING author_id;
      `,
      [name, country, bio],
    );

    return rows[0];
  } catch (err) {
    console.error(err);
  }
}

async function updateAuthor(id, { name, country, bio }) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE authors
      SET name = ($1), country = ($2), bio = ($3)
      WHERE author_id = ($4)
  `,
      [name, country, bio, id],
    );

    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function deleteAuthor(id) {
  try {
    await pool.query(`DELETE FROM authors WHERE author_id = ($1)`, [id]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  getLatestBooks,
  getAllAuthors,
  getSingleAuthor,
  getAllGenres,
  getBooksByGenre,
  getBooksByAuthor,
  createBook,
  updateBook,
  addNewAuthor,
  deleteBook,
  updateAuthor,
  deleteAuthor,
};
