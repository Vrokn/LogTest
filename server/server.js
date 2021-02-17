const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./variables.env" });
const app = express();
console.log(process.env.DB_URL);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("‘MongoDB Connected…’");
  })
  .catch((err) => console.log(err));

mongoose.connection.on("error", function (e) {
  console.error(e);
});

const UsersSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

UsersSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result ? user : null);
      });
    });
  }
  return null;
};

const Users = mongoose.model("Users", UsersSchema);

const path = require("path");
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(
  cookieSession({
    name: "session",
    keys: ["token"],
    // Cookie Options
    maxAge: 7 * 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(express.static(publicPath));
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const requireUser = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await Users.findOne({ _id: userId });
    res.locals.user = user;
    next();
  } else {
    return res.redirect("/login");
  }
};

app.post("/register", async (req, res) => {
  //POST /register - crea al usuario en MongoDB.
  const name = req.body.name;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new Users({ name: name, email: email, password: password });
  await user.save();
  res.status(200);
});

app.post("/login", async (req, res) => {
  //POST /login- autentica al usuario.
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Users.authenticate(email, password);
    if (user) {
      req.session.userId = user._id; // acá guardamos el id en la sesión
      return res.status(200);
    } else {
      res.status(500, { error: "Wrong email or password. Try again!" });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
app.get("*", async (req, res) => {
  const users = await Users.find();
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, host, () => {
  console.log("Server is up!");
});
