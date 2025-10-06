-- Wrap everything in a transaction so it’s all-or-nothing
BEGIN;

-- DROP tables if they already exist (for easy resets)
DROP TABLE IF EXISTS book_genres;
DROP TABLE IF EXISTS book_authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS genres;

-- MAIN TABLES
CREATE TABLE IF NOT EXISTS authors (
    author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    bio TEXT,
    CONSTRAINT unique_author_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS genres (
    genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(100) NOT NULL,
    CONSTRAINT unique_genre_name UNIQUE (genre_name)
);

CREATE TABLE IF NOT EXISTS books (
    book_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publish_date DATE,
    isbn VARCHAR(14) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- JUNCTION TABLES
CREATE TABLE IF NOT EXISTS book_authors (
    book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
    author_id INT NOT NULL REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE IF NOT EXISTS book_genres (
    book_id INT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

COMMIT;
