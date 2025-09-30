const { Router } = require("express");
const genresController = require("../controllers/genresController.js");

const genresRouter = Router();

genresRouter.get("/", genresController.allGenresGet);
genresRouter.get("/:genreId", genresController.filterByGenre);

module.exports = genresRouter;
