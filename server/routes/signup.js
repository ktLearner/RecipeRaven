const express = require("express");
const router = express.Router();

const userModel = require("../models/User");

router.post("/", (req, res) => {
  userModel.create(req.body)
    .then(() => {
      console.log("User created!");
      res.send({"message": "Success!", error: null});
    })
    .catch(e => {
      console.log("Error occurred!");
      res.send({"message": null, error: e.toString()});
    });
});

module.exports = router;