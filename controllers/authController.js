const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/queries");

async function login(req, res) {
  const { username, password } = req.body;

  const user = await db.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
}

module.exports = { login };
