const express = require("express");
const { createJWT } = require("../helpers/jwts");
const router = express.Router();

router.post("/", (req, res) => {
  const key = createJWT({ uname: req.uname, uid: req.uid });
  res.send({ message: "Success", key});
});

module.exports = router;