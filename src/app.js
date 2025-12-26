require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ nodig

const userRoutes = require("./routes/users");
const exerciseRoutes = require("./routes/exercises");
const categoryRoutes = require("./routes/categories");
const assetRoutes = require("./routes/assets");
const feedbackRoutes = require("./routes/feedback");

const app = express();

// ✅ CORS (laat 5173 én 5174 toe)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ uploads map zit bij jou op root naast /src
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// MongoDB connectie
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/feedback", feedbackRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
