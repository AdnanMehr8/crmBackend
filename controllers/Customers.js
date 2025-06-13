const CustomerModel = require("../models/Customers");

async function getAllCustomers(req, res) {
  try {
    const customers = await CustomerModel.find({});
    res.status(201).json({ success: true, customers });
  } catch (error) {
    console.error(error);
  }
}

async function getSingleCustomer(req, res) {
  try {
    const id = req.params.id;
    const singleCustomer = await CustomerModel.findById(id);
    res.status(201).json({
      success: true,
      message: "Customer Details fetched Successfully",
      singleCustomer,
    });
  }  catch (error) {
  console.error("Signup error:", error.message);
  console.error(error.stack);
  res.status(500).json({ success: false, message: error.message });
}
}

async function addNewCustomer(req, res) {
  try {
    // const { name, email, education } = req.body;
    const newCustomer = new CustomerModel(req.body);

    newCustomer.save();
    res.status(200).json({
      success: true,
      message: "Customer Created Successfully",
      newCustomer,
    });
  }  catch (error) {
  console.error("Signup error:", error.message);
  console.error(error.stack);
  res.status(500).json({ success: false, message: error.message });
}
}

async function updateCustomer(req, res) {
  try {
    const id = req.params.id;
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, req.body);
    updatedCustomer.save();
    res.status(201).json({
      success: true,
      message: "Customer Updated Successfully",
      updatedCustomer,
    });
  }  catch (error) {
  console.error("Signup error:", error.message);
  console.error(error.stack);
  res.status(500).json({ success: false, message: error.message });
}
}

async function deleteCustomer(req, res) {
  try {
    const id = req.params.id;
    const deletedCustomer = await CustomerModel.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Customer Deleted Successfully",
      deletedCustomer,
    });
  }  catch (error) {
  console.error("Signup error:", error.message);
  console.error(error.stack);
  res.status(500).json({ success: false, message: error.message });
}
}

module.exports = {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSingleCustomer,
};
