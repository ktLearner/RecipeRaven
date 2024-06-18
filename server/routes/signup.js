const express = require("express");
const router = express.Router();

const userModel = require("../models/User");
const { createJWT } = require("../helpers/jwts");
const moment = require("moment");

router.post("/", (req, res) => {
  userModel.create(req.body)
    .then(userDoc => {
      const data = {
        uname: userDoc.uname,
        avatar: userDoc.avatar,
        _id: userDoc._id,
        favourites: userDoc.favourites
      };
      
      const key = createJWT({ uname: userDoc.uname, uid: userDoc.uid });
      console.log("User created!");
      res.cookie("auth-token", key, {
        httpOnly: true,
        secure: false,
        expiresIn: moment().add(10, "day").format()
      });
      res.send({ "message": "Success!", data });
    })
    .catch(e => {
      console.log("Error occurred!");
      res.send({ error: e });
    });
});

module.exports = router;