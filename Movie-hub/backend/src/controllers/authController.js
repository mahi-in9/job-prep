const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { title, email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      title,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}