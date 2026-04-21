const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: "orgURL", required: true },
  newUrl: String,
});

module.exports = mongoose.model("URL", urlSchema);
