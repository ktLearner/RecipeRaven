const jwt = require("jsonwebtoken");

function createJWT(obj) {
  return jwt.sign(obj, process.env.JWT_ACCESS_KEY, { expiresIn: "10day" });
}

function verifyJWT(token) {
  let error = null, data = null;

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, obj) => {
    if (err) return error = err;
    data = obj;
	});

  return { data, error };
}

function verifyJWTFromHeader(header) {
  const authHeader = header["authorization"];
	const uToken = authHeader?.split(" ")[1];

  if (!uToken) {
    error = {
      name: "authHeaderNotProvided",
      message: "No auth header found"
    };
    return {data: null, error};
  };

  return verifyJWT(error, data);
}

function tokenFromCookie(req) {
  return req.cookies["auth-token"];
}

module.exports = {
  createJWT,
  verifyJWT,
  verifyJWTFromHeader,
  tokenFromCookie
}