const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../model/adminmodel"); // adjust path

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    if (!email || !password)
      return res.status(400).send({ msg: "Email and password are required" });

 
    const user = await AdminModel.findOne({ email });
    if (!user) return res.status(400).send({ msg: "User not found" });

    
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) return res.status(400).send({ msg: "Password does not match" });

   
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mySuperSecretKey123", // Use your own secret
      { expiresIn: "1h" }
    );

    res.status(200).send({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports = { AdminLogin };
