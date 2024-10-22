// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const morgan = require("morgan");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // MongoDB Connection
// if (!process.env.MONGODB_URI) {
//   console.error("MongoDB URI is not defined in the environment variables.");
//   process.exit(1);
// }

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// // Routes
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Graceful shutdown
// process.on("SIGINT", () => {
//   console.log("Shutting down gracefully...");
//   mongoose.connection.close(() => {
//     console.log("MongoDB connection closed.");
//     process.exit(0);
//   });
// });

// // Start the Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
