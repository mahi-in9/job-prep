const express = require("express");
const chalk = require("chalk");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const uploadExcel = require("./fileUploader");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadExcel);

module.exports = router;
