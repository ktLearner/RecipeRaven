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
    expires: new Date(Date.now() + 10*24*60*60*1000)
  });
  
  res.send({ message: "Success", data});
});

module.exports = router;