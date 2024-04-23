const { Router } = require("express");
const { tokenFromCookie, verifyJWT } = require("../helpers/jwts");
const router = new Router;

const userModel = require("../models/User");

router.get("/", async (req, res) => {
  const cookieToken = tokenFromCookie(req);
  if (!cookieToken) return res.send();

  const { data, error } = verifyJWT(cookieToken);
  if (error) {
    res.clearCookie("auth-token").send();
  };

  const user = await userModel.findOne({
    uid: data["uid"],
  });

  res.send({ uname: user.uname, avatar: user.avatar });
});

module.exports = router;