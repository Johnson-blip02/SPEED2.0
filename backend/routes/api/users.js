const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

//Iteration 3
// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the user data back as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error fetching users." });
  }
});

//Iteration 3
//This is just checking if an Email is there
//Not needed for the frontend just testing
// Route to get a specific user by Email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user); // Send the user data back as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error fetching user." });
  }
});

//Iteration 3
// Route to register a new user
router.post("/register", async (req, res) => {
  const { UserType, Email, Password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = new User({
      UserType,
      Email,
      Password,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error registering user." });
  }
});

//Iteration 3
// Route to log in an existing user
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Check if the password matches
    if (user.Password !== Password) {
      return res.status(400).json({ message: "Invalid password." });
    }

    return res.status(200).json({ message: "Logged in successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in." });
  }
});

module.exports = router;
