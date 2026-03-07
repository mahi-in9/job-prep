const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  year: Number,
  genre: String,
  rating: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
