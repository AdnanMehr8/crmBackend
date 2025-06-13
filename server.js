const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const customerRoute = require("./routes/customer");
const userRoute = require("./routes/user");

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((err) => {
    console.error("Error Connecting DB: ", err);
  });

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "https://crm-humai.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api", customerRoute);
app.use("/api", userRoute);

// ✅ Export the app for Vercel (DON'T listen to a port)
module.exports = app;
