const { Router } = require("express");
const router = new Router;
const userModel = require("../models/User");

router.get("/", async (req, res) => {
  const uid = req.query["u"];

  if (!uid) return res.status(400).send({ message: "UID not provided" });

  try {
    const user = await userModel.findOne({
      _id: uid
    }, ["uname", "avatar", "createdAt", "favourites"]);
    
    res.send(user);
  } catch(error) {
    res.send(error);
  }
});

module.exports = router;