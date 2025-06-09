const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  email: String,
  education: String,
});

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
