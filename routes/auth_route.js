const express = require("express");
const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth_middleware");

const authRouter = express.Router();

//sing up
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sign in
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Não existe nenhum usuário com esse email" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ id: user.id }, "passWordKey");
    res.json({ token, ...user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//token validation
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const isVerified = jwt.verify(token, "passWordKey");
    if (!isVerified) return res.json(false);

    const user = await User.findById(isVerified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user, token: req.token });
});

module.exports = authRouter;
