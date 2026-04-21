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
    const token = generateToken(url);
    const newUrl = URL.create({
      urlId: url._id,
      newUrl: `http://localstorage:4000/${token}`,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "url created successfully",
        data: newUrl,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
}

async function getURL(req, res) {
  try {
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
}
