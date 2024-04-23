const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = {
  login : require("./routes/login"),
  signup : require("./routes/signup"),
  test: require("./routes/test")
};

const middlewares = {
  login: require("./middlewares/login"),
  signup: require("./middlewares/signup")
};

dotenv.config({
  path: "../.env.example"
});

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("db connected"));

const WHITELIST_URLS = process.env.CLIENT_URLS.split(" ");

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

// app.use("/test", routes.test);

app.listen(process.env.PORT, () => {
  console.log("running on port : " + process.env.PORT);
});