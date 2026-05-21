const express = require("express");
const app = express();
const mongoose = require("mongoose");
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("mongooDb connected"))
  .catch((err) => console.log(err));

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model("url", urlSchema);

function generateShortUrl() {
  return jwt.sign({ userId: user._id }, "secret-key", { expiresIn: "1h" });
}

async function getShortUrl(originalUrl) {
  console.log(originalUrl, "original");
  const shortUrl = await Url.findOne({ originalUrl: originalUrl });
  console.log(shortUrl, "shortUrl");
  if (shortUrl) {
    console.log(shortUrl);
    return shortUrl.shortUrl;
  } else {
    console.log(originalUrl, "else");
    const newShortUrl = generateShortUrl(originalUrl);
    console.log(originalUrl, "else");
    const newUrl = new Url({ originalUrl, shortUrl, newShortUrl });
    await newUrl.save();
    return newShortUrl;
  }
}

async function getOriginalUrl(shortUrl) {
  const url = await Url.findOne({ shortUrl });
  return url ? url.originalUrl : null;
}

app.post("/shorten", async (req, res) => {
  try {
    // console.log(req.body.originalUrl);
    const originalUrl = req.body.originalUrl;
    const shortUrl = await getShortUrl(originalUrl);
    res.status(200).json({ shortUrl: `http://localhost:${shortUrl}` });
  } catch (error) {
    res.send(error);
  }
});

app.get("/:showUrl", async (req, res) => {
  const showUrl = req.params.shortUrl;
  const originalUrl = await getOriginalUrl(shortUrl);
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("Not found");
  }
});

const port = 3000;

app.listen(port, () => console.log("app is running on port", port));
