const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

const checkExistingUser = async (email) => {
  return UserModel.findOne({ email });
};

async function signUp(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if ((!name || !email || !password, !role)) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Please enter a name, email address, and password.",
      });
    }
    const existingUser = await checkExistingUser(email);
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "A user with this email address already exists.",
      });
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid password", message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deletedCustomer = await UserModel.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
      deletedCustomer,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  signUp,
  login,
  deleteUser,
};
