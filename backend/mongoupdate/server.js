require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDb connencted"))
  .catch((error) => console.log(error));

let userSchema = mongoose.Schema({
  title: { type: String, required: true },
  marks: { type: Number, required: true },
  grade: { type: String, required: true },
  isScholar: { type: Boolean },
});
mongoose.model("User", userSchema);

app.get("/api/mongo/fetch", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/mongo/seed", async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    const inserted = await User.insertMany(users);

    res.status(201).json({
      success: true,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/mongo/update-scholar", async (req, res) => {
  try {
    const users = await User.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true },
    );
    if (users.length) {
      return res.status(400).json({ success: false, message: "no user found" });
    }
    users = users
      .filter((user) => {
        if (user.marks >= 75 && user.grade === "A") {
          return user;
        }
      })
      .map((user) => {
        return { ...user, isScholar: true };
      });

    users.save();

    return res.status(200).json({ success: true, message: "scholar updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("app is running on PORT", PORT);
});
