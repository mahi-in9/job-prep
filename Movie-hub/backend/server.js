require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Api is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:3000`);
});
