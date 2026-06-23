const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminModel = require("./App/model/adminmodel");
require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

const createAdmin = async () => {
  const email = "sandhyadahal864@gmail.com";
  const password = "admin123";

  try {
    const adminExists = await AdminModel.findOne({ email });
    if (adminExists) {
      console.log("Admin already exists");
      return mongoose.disconnect();
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await AdminModel.create({ email, password: hashPassword });
    console.log("Admin created successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error creating admin:", err.message);
    mongoose.disconnect();
  }
};

createAdmin();
