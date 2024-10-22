const express = require("express");
const router = express.Router();
const Article = require("../models/Article"); // Adjust the path as necessary

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch articles where isApproved is false and isAnalysis is true
router.get("/moderation", async (req, res) => {
  try {
    const articles = await Article.find({
      isApproved: false,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles." });
  }
});

// Route to approve an article by custom id
router.put("/:id/approve", async (req, res) => {
  const articleId = req.params.id; // Now using _id instead of custom id
  const { isApproved } = req.body; // Get isApproved value from the request body
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId, // Using _id directly
      { isApproved }, // Use the isApproved value from the request
      { new: true } // Return the updated document
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating article approval status." });
  }
});

// Route to update an article by _id
router.put("/:id", async (req, res) => {
  const articleId = req.params.id; // Get the article's _id from the URL
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId, // Using _id directly
      req.body, // Use the request body to update the article fields
      { new: true, runValidators: true } // Return the updated document and validate
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error updating article." });
  }
});

// Route to delete an article by _id
router.delete("/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article." });
  }
});

// Route to get a single article by custom id (_id in MongoDB)
router.get("/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findById(articleId); // Find by MongoDB _id
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article." });
  }
});

// Route to add/save article with auto-incrementing id
router.post("/", express.json(), async (req, res) => {
  try {
    const lastArticle = await Article.findOne().sort({ id: -1 });
    const formattedDate = new Date(req.body.date).toISOString().split("T")[0];

    const newArticle = new Article({
      ...req.body,
      date: formattedDate,
      id: lastArticle ? lastArticle.id + 1 : 1,
    });

    await newArticle.save();
    res
      .status(201)
      .json({ msg: "Article added successfully", article: newArticle });
  } catch (err) {
    res.status(400).json({ error: "Unable to add this article" });
  }
});

// Route to approve an article for analysis by _id
router.put("/:id/approveAnalysis", async (req, res) => {
  const articleId = req.params.id;
  const { isAnalysis } = req.body; // Get isAnalysis value from the request body
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { isAnalysis }, // Update the isAnalysis field
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error approving article for analysis." });
  }
});

// Route to fetch articles where isApproved is true and isAnalysis is false
router.get("/analysis/pending", async (req, res) => {
  try {
    const articles = await Article.find({
      isApproved: true,
      isAnalysis: false,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles." });
  }
});

module.exports = router;
