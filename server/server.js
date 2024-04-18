const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = {
  login : require("./routes/login"),
  signup : require("./routes/signup")
};

const middlewares = {
  login: require("./middlewares/login"),
  signup: require("./middlewares/signup")
};

dotenv.config({
  path: "../.env"
});

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("db connected"));

app.use(cors());
app.use(express.json());
app.use("/login", middlewares.login, routes.login);
app.use("/signup", middlewares.signup, routes.signup);

app.listen(process.env.PORT, () => {
  console.log("running on port : " + process.env.PORT);
});