const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./variables.env" });
const InitiateMongoServer = require("./config/db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./model/Users");
const auth = require("./middleware/auth");

const app = express();

InitiateMongoServer();

const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(express.static(publicPath));
app.use(bodyParser.json()); // for parsing application/json

app.post(
  "/register",
  [
    check("name", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      user = new Users({ name, email, password });
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

app.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });
      const payload = {
        user: { id: user.id },
      };
      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

app.get("/", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Users.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, host, () => {
  console.log("Server is up!");
});
