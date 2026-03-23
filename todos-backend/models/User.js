const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos" }],
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
