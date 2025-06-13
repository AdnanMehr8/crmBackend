const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const dbConnect = async () => {
  try {
await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    console.log("MongoDB Successfully Connected");
  } catch (error) {
    console.error("Error Connecting DB: ", error);
  }
};

module.exports = dbConnect;
