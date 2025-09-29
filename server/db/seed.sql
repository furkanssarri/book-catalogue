BEGIN;

-- Insert an author (or do nothing if exists)
INSERT INTO authors (name, country, bio)
VALUES ('J.K. Rowling', 'UK', 'British author of Harry Potter')
ON CONFLICT (name) DO NOTHING
RETURNING author_id;

-- Insert a genre
INSERT INTO genres (genre_name)
VALUES ('Fantasy')
ON CONFLICT (genre_name) DO NOTHING
RETURNING genre_id;

-- Insert a book
INSERT INTO books (title, description, publish_date, isbn)
VALUES ('Harry Potter and the Philosopher''s Stone', 'First book in the series', '1997-06-26', '9780747532699')
RETURNING book_id;

-- Link book to author
INSERT INTO book_authors (book_id, author_id)
VALUES (1, 1);

-- Link book to genre
INSERT INTO book_genres (book_id, genre_id)
VALUES (1, 1);

COMMIT;
