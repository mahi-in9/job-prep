const URL = require("../models/url.model");
const orgURL = require("../models/originalurl.model");
const jwt = require("jsonwebtoken");

function generateToken() {
  return jwt.sign({ id: url._id }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
}

async function createURL(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ sucess: true, message: "URL is required" });
    }

    const orgURl = orgURl.create({
      url,
    });
    const newUrl = URL.create({
      urlId: url._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
}
