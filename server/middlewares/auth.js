const { verifyJWT } = require("../helpers/jwts");

function auth(req, res, next) {
  const { data } = verifyJWT(req.cookies["auth-token"]);
  if (!data) return res.status(400).redirect("/login");
  
  req.data = data;
  next();
}

module.exports = auth;