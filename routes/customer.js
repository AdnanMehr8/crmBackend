const express = require("express");
const {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSingleCustomer,
} = require("../controllers/Customers");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/customers", authMiddleware, getAllCustomers);
router.get("/customer/:id", authMiddleware, getSingleCustomer);

router.post("/add", authMiddleware, addNewCustomer);

router.put("/customer/:id", authMiddleware, updateCustomer);

router.delete("/delete/:id", authMiddleware, deleteCustomer);

module.exports = router;
