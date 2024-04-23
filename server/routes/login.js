const express = require("express");
const { createJWT } = require("../helpers/jwts");
const moment = require("moment");
const router = express.Router();

router.post("/", (req, res) => {
  const key = createJWT({ uname: req.uname, uid: req.uid });
  const data = {
    uname: req.uname,
    avatar: req.avatar
  };

  res.cookie("auth-token", key, {
    httpOnly: true,
    secure: false,
    expiresIn: moment().add(10, "day").format()
  });
  
  res.send({ message: "Success", data});
});

module.exports = router;