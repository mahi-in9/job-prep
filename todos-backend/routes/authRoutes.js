const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;
