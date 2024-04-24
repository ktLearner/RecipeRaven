const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./helpers/jwts");

const routes = {
  login : require("./routes/login"),
  signup : require("./routes/signup"),
  fetchUser: require("./routes/fetchuser"),
  createrecipe: require("./routes/createrecipe")
  // test: require("./routes/test"),
};

const middlewares = {
  login: require("./middlewares/login"),
  signup: require("./middlewares/signup"),
};

dotenv.config({
  path: "../.env.example"
});

const WHITELIST_URLS = process.env.CLIENT_URLS.split(" ");

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("db connected"));

app.use(cors({
  credentials: true,
  origin: (origin, res) => {
    if (WHITELIST_URLS.includes(origin)) res(null, true)
    else res(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());
app.use(cookieParser());
app.use("/login", middlewares.login, routes.login);
app.use("/signup", middlewares.signup, routes.signup);
app.use("/signout", (req, res) => {
  const { error } = verifyJWT(req.cookies["auth-token"]);
  if (error) return res.status(500).send({ error });

  res.clearCookie("auth-token").send({ message: "Success!" });
});

app.use("/createrecipe", routes.createrecipe);
app.use("/fetchuser", routes.fetchUser);

// app.use("/test", routes.test);

app.listen(process.env.PORT, () => {
  console.log("running on port : " + process.env.PORT);
});