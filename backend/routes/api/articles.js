const express = require("express");
const router = express.Router();
const Article = require("../../models/Articles");

// @route GET api/articles/test
// @description tests articles route
// @access Public
router.get("/test", (req, res) => res.send("article route testing!"));

// @route GET api/articles
// @description Get all articles
// @access Public
router.get("/", (req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) =>
      res.status(404).json({ noarticlesfound: "No Articles found" })
    );
});

//Iteration 3
// Route to fetch articles where isApproved is false and isAnalysis is true
router.get("/moderation", async (req, res) => {
  try {
    const articles = await Article.find({
      isApproved: false,
      isAnalysis: true,
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles." });
  }
});

//Iteration 3
// Route to update isApproved status of an article
router.put("/approve/:id", async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found." });
    }

    res.json({
      message: "Article status updated successfully.",
      updatedArticle,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating article status." });
  }
});

// @route GET api/articles/:id
// @description Get single article by custom id
// @access Public
// @route GET api/articles/:id
// @description Get single article by id
// @access Public
// @route GET api/articles/:id
// @description Get single article by custom id
router.get("/:id", (req, res) => {
  const articleId = parseInt(req.params.id, 10); // Convert id to a number
  Article.findOne({ id: articleId }) // Fetch by custom id
    .then((article) => {
      if (!article) {
        return res.status(404).json({ noarticlefound: "No Article found" });
      }
      res.json(article);
    })
    .catch((err) =>
      res.status(404).json({ noarticlefound: "No Article found" })
    );
});

// @route POST api/articles
// @description Add/save article with auto-incrementing id
// @access Public
router.post("/", express.json(), async (req, res) => {
  try {
    // Find the current highest id in the database
    const lastArticle = await Article.findOne().sort({ id: -1 });

    // Format the date to 'YYYY-MM-DD'
    const formattedDate = new Date(req.body.date).toISOString().split("T")[0];

    const newArticle = new Article({
      ...req.body,
      date: formattedDate, // Store the date as 'YYYY-MM-DD' string
      id: lastArticle ? lastArticle.id + 1 : 1, // Auto-increment ID
    });

    await newArticle.save();
    res
      .status(201)
      .json({ msg: "Article added successfully", article: newArticle });
  } catch (err) {
    res.status(400).json({ error: "Unable to add this article" });
  }
});

// @route PUT api/articles/:id
// @description Update article by custom id
// @access Public
// @route PUT api/articles/:id
// @description Update article by custom id
router.put("/:id", (req, res) => {
  const articleId = parseInt(req.params.id, 10); // Convert id to a number

  Article.findOneAndUpdate({ id: articleId }, req.body, { new: true })
    .then((article) => {
      if (!article) {
        return res.status(404).json({ noarticlefound: "No Article found" });
      }
      res.json({ msg: "Updated successfully", article });
    })
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// Route to fetch articles where isAnalysis is false
router.get("/analysis/pending", async (req, res) => {
  try {
    const articles = await Article.find({ isAnalysis: false });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles." });
  }
});

// @route DELETE api/articles/:id
// @description Delete article by custom id
// @access Public
router.delete("/:id", (req, res) => {
  const articleId = parseInt(req.params.id, 10); // Convert id to a number

  Article.findOneAndRemove({ id: articleId })
    .then((article) => {
      if (!article) {
        return res.status(404).json({ noarticlefound: "No Article found" });
      }
      res.json({ msg: "Article entry deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to delete article" })
    );
});

module.exports = router;
