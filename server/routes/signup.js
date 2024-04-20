const express = require("express");
const router = express.Router();

const userModel = require("../models/User");
const { createJWT } = require("../helpers/jwts");

router.post("/", (req, res) => {
  userModel.create(req.body)
    .then(userDoc => {
      const key = createJWT({ uname: userDoc.uname, uid: userDoc.uid });
      console.log("User created!");
      res.send({ "message": "Success!", key });
    })
    .catch(e => {
      console.log("Error occurred!");
      res.send({ error: e });
    });
});

module.exports = router;