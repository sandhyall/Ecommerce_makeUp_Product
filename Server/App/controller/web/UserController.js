const bcrypt = require("bcrypt");
const usermodels = require("../../model/usermodel");

// Register
const RegisterInsert = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await usermodels.findOne({ email });
    if (existUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new usermodels({
      name,
      email,
      password: hashPassword, 
    });

    await user.save();
    res.status(201).send({ msg: "Created successfully" });

  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

// Login
const RegisterLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodels.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Password does not match" });
    }

    res.status(200).send({ msg: "Login successful" });

  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports = { RegisterInsert, RegisterLogin };
