require("dotenv").config();
const express = require("express");
const path = require("node:path");

const booksRouter = require("./routes/booksRouter.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (_req, res) => {
  res.render("index", { title: "Home" });
});

app.use("/books", booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening on port ${PORT}...`);
});
