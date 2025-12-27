require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const assetRoutes = require("./routes/assets");
// (optioneel) als je ze hebt:
// const exerciseRoutes = require("./routes/exercises");
// const categoryRoutes = require("./routes/categories");
// const feedbackRoutes = require("./routes/feedback");

const app = express();

// --- CORS (front draait op 5173)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// statische map voor uploads (zodat je bestanden kan openen via URL)
app.use("/uploads", express.static("uploads"));

// --- Routes
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);

// --- Mongo connect (1x)
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.warn("⚠️  MONGO_URI ontbreekt in je .env");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err.message));
}

module.exports = app;
