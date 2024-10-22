const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("../route/articles"); // Import the articles routes
const usersRouter = require("../route/user"); // Import the users routes

const app = express();
const cors = require("cors");

// Allow requests from your frontend (localhost:3000) during development
app.use(
  cors({
    origin: "*", // Adjust the origin as needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed methods
    credentials: true, // If you want to allow credentials (cookies, etc.)
  })
);

app.use(express.json()); // Middleware for parsing JSON

// MongoDB connection
require("dotenv").config();

let isConnected; // Variable to store connection state

const connectToDatabase = async () => {
  if (isConnected) return Promise.resolve();

  isConnected = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return isConnected;
};

app.use(async (req, res, next) => {
  await connectToDatabase(); // Ensure MongoDB is connected for every request
  next();
});

// Routes
app.use("/articles", articlesRouter); // Articles routes
app.use("/users", usersRouter); // User routes

// Basic route
app.get("/", (req, res) => res.send("Express on Vercel"));

// Export for serverless function
module.exports = app;
