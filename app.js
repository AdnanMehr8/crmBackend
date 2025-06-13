// app.js
const express = require("express");
const dbConnect = require("./config/db");
const customerRoute = require("./routes/customer");
const userRoute = require("./routes/user");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect DB
dbConnect();

app.use(express.json());
app.use(morgan("dev"));

// Global CORS (recommended)
const corsOptions = {
  origin: "https://crm-humai.vercel.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Optional: handle preflight
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api", customerRoute);
app.use("/api", userRoute);

// Export the app (not listening here!)
module.exports = app;
