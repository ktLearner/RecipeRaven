const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

console.log(process.env)

dotenv.config({
  path: "../.env"
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(fs.readFileSync("../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("running on port : " + PORT);
});