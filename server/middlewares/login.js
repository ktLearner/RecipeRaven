const { verifyJWT } = require("../helpers/jwts");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");

async function auth(req, res, next) {
  const data = req.body;
  const user = await userModel.findOne({
    $or: [
      {email: data["uname"]},
      {uname: data["uname"]}
    ]
  });

  if (!user) return res.status(400).send({ error: "User not found" });
  const passCheck = await bcrypt.compare(data.pass, user.pass);

  if (!passCheck) return res.status(401).send({ error: "Wrong password" });
  
  req.uid = user.uid;
  req.uname = user.uname;
  req.avatar = user.avatar;

  next();
}

module.exports = auth;