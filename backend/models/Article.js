const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  date: String, // Changed to String
  content: String,
  tags: [String],
  isApproved: Boolean,
  isAnalysis: Boolean,
  rating: Number,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
