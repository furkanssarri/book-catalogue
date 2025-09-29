const pool = require("../db/pool.js");

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

module.exports = {
  getAllBooks,
};
