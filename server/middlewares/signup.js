const bcrypt = require("bcrypt");
const userModel = require("../models/User");

async function auth(req, res, next) {
  const {uname, email, pass, avatar} = req.body;

  const reg = {
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
    uname: /.+/i
  }

  if (!(3 < uname.length <= 10)) return res.status(400).send({error: "Username length must be between 3 and 10"});
  if (!reg.email.test(email)) return res.status(400).send({error: "Invalid email!"})
  if (await userModel.exists({ uname })) return res.status(403).send({ error: "User with that username already exists!"});
  if (await userModel.exists({ email })) return res.status(403).send({error: "User with that email already exists!"});

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(pass, salt);
  req.body.pass = hashed;

  next();
}

module.exports = auth;