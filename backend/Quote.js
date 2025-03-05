const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  tags: [String]
});

module.exports = mongoose.model("Quote", quoteSchema);
