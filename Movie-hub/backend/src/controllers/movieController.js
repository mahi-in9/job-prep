const movie = require("../models/movie");
const Movie = require("../models/movie");

const createMovie = async (req, res) => {
  try {
    console.log(req.body);
    const { title, year, genre, rating } = req.body;

    if (!title || !year || !genre || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMovie = new Movie({
      title: title.trim(),
      year,
      genre,
      rating,
    });

    await newMovie.save();

    return res.status(201).json({ success: true, data: newMovie });
  } catch (error) {
    console.error("Error creating Movie:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: 500, message: "Server error", error });
  }
};

const getMovie = async (req, res) => {
  try {
    console.log(req.query);
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Movie title is required",
      });
    }

    const movies = await Movie.find({
      title: { $regex: title, $options: "i" },
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Movie Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, count: movies.length, data: movies });
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
    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // const { title } = req.body;

    const movie = await Movie.findByIdAndDelete(req.params.id);
    // if (!movie) {
    return res
      .status(202)
      .json({ success: true, message: "Movie deleted successfully" });
    // }
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
