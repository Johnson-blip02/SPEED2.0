const mongoose = require("mongoose");

// Define the schema for Users
const UserSchema = new mongoose.Schema({
  UserType: { type: String, required: true }, // Ensure UserType is required
  Email: { type: String, required: true, unique: true }, // Email must be unique
  Password: { type: String, required: true }, // Password is required
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
