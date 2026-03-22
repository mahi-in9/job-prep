const User = require("../models/User");
const jwt = require("jsonwebtoken");
const TokenBlackList = require("../models/blacklist");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token not provided" });
    }
    const isTokenBlacklisted = await TokenBlackList.findOne({ token });

    if (isTokenBlacklisted) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};

module.exports = authMiddleware;
