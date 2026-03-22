const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokenBlackList = require("../models/blacklist");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (findUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: server.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);
    res.status(200).json({
      message: "User loggedIn successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: server.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      await TokenBlackList.create({ token });
    }
    res.status(200).json({
      message: "User logged out successfully",
    });

    res.clearCookie("token");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: server.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
};

module.exports = {registerUser, loginUser, logoutUser, getMe}