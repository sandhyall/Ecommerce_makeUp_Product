const bcrypt = require("bcrypt");
 jwt = require('jsonwebtoken');
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

     const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({ msg: "Login successful" ,token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },);

  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports = { RegisterInsert, RegisterLogin };
