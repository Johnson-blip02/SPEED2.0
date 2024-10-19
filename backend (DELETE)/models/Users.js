const mongoose = require("mongoose");

// Define the schema for Users
const UserSchema = new mongoose.Schema({
  UserType: String,
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
