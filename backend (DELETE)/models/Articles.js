const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  date: String, // Change this from 'Date' to 'String'
  content: String,
  tags: [String],
  isApproved: Boolean,
  isAnalysis: Boolean,
  rating: Number,
});

module.exports = Article = mongoose.model("article", ArticleSchema);
