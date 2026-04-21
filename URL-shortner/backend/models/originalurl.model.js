const mongoose = require("mongoose");

const originalurlSchema = new mongoose.Schema({
  url: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("orgURL", originalurlSchema);
