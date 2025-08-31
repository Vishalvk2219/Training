const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserCollection } = require("../utils/utils");

async function register(req, res) {
  try {
    const { name, email, password, mobile, role, age } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await getUserCollection().insertOne({
      name,
      email,
      password: hashed,
      mobile: mobile || null,
      role: role || "student",
      age: age || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserCollection().findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
