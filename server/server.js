const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./variables.env" });
const InitiateMongoServer = require("./config/db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");
const app = express();

InitiateMongoServer();

const Users = require("./model/Users");
const Courses = require("./model/Courses");

const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3030;
const host = process.env.HOST || "0.0.0.0";

app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json

app.post("/users", async (req, res) => {
  const { email, role } = req.body;
  try {
    const user = await Users.updateOne({ email }, { role });
    if (!user) {
      return res.status(400).json({ error: "User don't Exists" });
    }
  } catch (e) {
    res.send({ error: "Error in Updating users" });
  }
});

app.post(
  "/account",
  [
    check("name", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await Users.updateOne({ email }, { name, password });
      if (!user) {
        return res.status(400).json({ error: "User don't Exists" });
      }
    } catch (e) {
      res.send({ error: "Error in updating users" });
    }
  }
);

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
        return res.status(400).json({ error: "User Already Exists" });
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
      res.status(500).send({ error: "Error in Saving" });
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
      if (!user) return res.status(400).json({ error: "User Not Exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Incorrect Password !" });
      const payload = { user: { id: user.id } };
      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, user });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "Server Error",
      });
    }
  }
);

app.get("/usersdata", async (req, res) => {
  try {
    const createdUsers = await Users.find({});
    res.json(createdUsers);
  } catch (e) {
    res.send({ error: "Error in Fetching users" });
  }
});

app.get("/coursesdata", async (req, res) => {
  try {
    const createdCourses = await Courses.find({});
    res.json(createdCourses);
  } catch (e) {
    res.send({ error: "Error in Fetching Courses" });
  }
});

app.post(
  "/courses",
  [
    check("name", "Please Enter a Valid Course Name").not().isEmpty(),
    check("description", "Please Enter a Valid Description").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, description } = req.body;
    try {
      let course = await Courses.findOne({ name });
      if (course) {
        return res.status(400).json({ error: "Course Already Exists" });
      }
      course = new Courses({ name, description });
      await course.save();
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: "Error in Saving" });
    }
  }
);

app.get("/", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Users.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ error: "Error in Fetching user" });
  }
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, host, () => {
  console.log("Server is up!");
});
