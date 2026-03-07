const Movie = require("../models/movie");

const createMovie = async (req, res) => {
  try {
    const { title, year, genre, rating } = req.body;

    const newMovie = new Movie({
      title: title.trim(),
      year: year,
      genre: genre,
      rating: rating,
    });

    await newMovie.save();

    res
      .status(201)
      .json({ success: true, message: "Movie craeted successfully" });
  } catch (error) {
    console.error("Error creating Movie:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const Movies = await Movie.find();
    res.status(200).json({ success: true, Movies });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: 500, message: "Server error", error });
  }
};

const getMovie = async (req, res) => {
  try {
    const { title } = req.query;

    const movies = await Movie.find({
      title: { $regex: title, $options: "i" },
    });

    if (!movies.length) {
      return res
        .status(404)
        .json({ success: false, message: "Movie Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // const { title } = req.body;

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res
        .status(202)
        .json({ success: true, message: "Movie deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
