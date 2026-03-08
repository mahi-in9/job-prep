const express = require("express");

const router = express.Router();

const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.post("/add", createMovie);
router.get("/all-movies", getAllMovies);
router.get("/find-movie", getMovie);
router.put("/update-movie/:id", updateMovie);
router.delete("/delete-movie/:id", deleteMovie);

module.exports = router;
