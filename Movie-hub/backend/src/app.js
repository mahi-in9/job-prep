const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/movie", movieRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
