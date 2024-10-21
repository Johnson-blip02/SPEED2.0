const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const articles = require("./routes/api/articles");
const users = require("./routes/api/users"); // Import the users route

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // To parse incoming JSON requests

// Basic route for testing
app.get("/", (req, res) =>
  res.status(200).json("Welcome, your app is working well")
);

// Use Routes
app.use("/api/articles", articles);
app.use("/api/users", users); // Use the users route

// Server Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
