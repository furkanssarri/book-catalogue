const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("hello world!");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening on port ${PORT}...`);
});
