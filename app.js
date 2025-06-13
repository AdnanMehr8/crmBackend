// app.js
const express = require("express");
const dbConnect = require("./config/db");
const customerRoute = require("./routes/customer");
const userRoute = require("./routes/user");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ DB Connection
dbConnect();

// ✅ Global Middleware
app.use(express.json());
app.use(morgan("dev"));

// ✅ CORS - Must come BEFORE routes
const corsOptions = {
  origin: "https://crm-humai.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS requests globally
app.options("*", cors(corsOptions));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", customerRoute);
app.use("/api", userRoute);

// ✅ Export the app
module.exports = app;
