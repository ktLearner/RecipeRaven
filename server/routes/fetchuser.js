const { Router } = require("express");
const { tokenFromCookie, verifyJWT } = require("../helpers/jwts");
const router = new Router();

const userModel = require("../models/User");

router.get("/", async (req, res) => {
  const cookieToken = tokenFromCookie(req);
  if (!cookieToken) return res.send();

  const { data, error } = verifyJWT(cookieToken);
  if (error) {
    return res.clearCookie("auth-token").send();
  }

  try {
    const user = await userModel.findOne(
      {
        uid: data["uid"],
      },
      ["uname", "avatar", "favourites", "createdAt"]
    );

    res.send(user);
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
