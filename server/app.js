require("dotenv").config();
const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/indexRouter.js");
const booksRouter = require("./routes/booksRouter.js");
const genresRouter = require("./routes/genresRouter.js");
const newBookRouter = require("./routes/newBookRouter.js");
const authorsRouter = require("./routes/authorsRouter.js");

const app = express();

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);
app.use("/newbook", newBookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening on port ${PORT}...`);
});
