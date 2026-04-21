const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orgURL",
    required: true,
  },
  newUrl: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("URL", urlSchema);
