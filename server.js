const express = require("express");
const dbConnect = require("./config/db");
const customerRoute = require("./routes/customer");
const userRoute = require("./routes/user");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

dbConnect();

app.use(express.json());

app.use(morgan("dev"));

var corsOptions = {
  origin: "https://crm-frontend-kxn7.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", cors(corsOptions), customerRoute);
app.use("/api", cors(corsOptions), userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on PORT: ${port}`);
});
