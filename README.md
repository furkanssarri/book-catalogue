# Book Catalogue

## Project Overview

The Book Catalogue is an inventory application designed for cataloging books, authors, and genres. This project is developed as part of [The Odin Project's](https://www.theodinproject.com) Node.js Express course. It serves as a practical implementation of a full-stack web application using modern technologies.

[Link to live demo](#) - *Coming soon*

## Features

- Catalog and manage a list of books, authors, and genres.
- User-friendly interface with Express and EJS.
- Robust validation with Express Validator.
- PostgreSQL database integration for data persistence.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- PostgreSQL

### Installation Steps

1. **Clone the repository:**

```sh
   git clone https://github.com/furkanssarri/book-catalogue.git
   cd book-catalogue
```

2. **Install Dependencies**

```sh
  npm install
```

3. **Configure Environment Variables**

```sh
  mkdir .env
```

Add your PosgreSQL config.

4. **Initialize the Database**

```sh
  npm run init
```

5. **Start the Server**

```sh
  npm run dev
```

The server will be running on <http://localhost:3000/>.

### Project Structure / Directory Tree

```txt

/book-catalogue
├── server
│   ├── app.js
│   ├── controllers
│   │   ├── authorsController.js
│   │   ├── booksController.js
│   │   ├── genresController.js
│   │   ├── newBookController.js
│   │   └── queryDb.js
│   ├── db
│   │   ├── init.js
│   │   └── pool.js
│   ├── routes
│   │   ├── authorsRouter.js
│   │   ├── booksRouter.js
│   │   ├── genresRouter.js
│   │   ├── indexRouter.js
│   │   └── newBookRouter.js
│   └── validators
│       ├── bookValidator.js
│       └── validateAuthor.js
├── package.json
└── package-lock.json
```

### Contribution

Contributions are welcome. Feel free to fork the repo.

### License

This project is licensed under the MIT license.

### Acknowledgements

This application was developed as part of the [The Odin Project](theodinproject.com) Web development curriculum.
