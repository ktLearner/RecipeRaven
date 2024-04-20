const express = require("express");
const { createJWT } = require("../helpers/jwts");
const router = express.Router();

router.post("/", (req, res) => {
  const key = createJWT({ uname: req.uname, uid: req.uid });
  const data = {
    uname: req.uname,
    avatar: req.avatar
  };
  res.send({ message: "Success", key, data});
});

module.exports = router;