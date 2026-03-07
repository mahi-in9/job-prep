const express = require("express");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/movie", movieRoutes);

module.exports = app;
