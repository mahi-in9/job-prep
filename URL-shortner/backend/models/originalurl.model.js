const mongoose = require("mongoose");

const originalurlSchema = new mongoose.Schema({
  url: String,
});

module.exports = mongoose.model("orgURL", originalurlSchema);
