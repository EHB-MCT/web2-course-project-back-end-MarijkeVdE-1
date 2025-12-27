require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/users");
const assetRoutes = require("./routes/assets");

const app = express();

// ✅ CORS voor Vite
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ uploads map publiek maken
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);

module.exports = app;
