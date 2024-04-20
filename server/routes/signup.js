const express = require("express");
const router = express.Router();

const userModel = require("../models/User");
const { createJWT } = require("../helpers/jwts");

router.post("/", (req, res) => {
  userModel.create(req.body)
    .then(() => {
      const key = createJWT(req.body);
      console.log("User created!");
      res.send({"message": "Success!", key, error: null});
    })
    .catch(e => {
      console.log("Error occurred!");
      res.send({"message": null, error: e.toString()});
    });
});

module.exports = router;