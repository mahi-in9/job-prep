require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose connected"))
  .catch((error) => console.log(error));

const PORT = 4000;

app.listen(PORT, () => {
  console.log("App is running on PORT:", PORT);
});
