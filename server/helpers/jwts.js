const jwt = require("jsonwebtoken");

function createJWT(obj) {
  return jwt.sign(obj, process.env.JWT_ACCESS_KEY);
}

function verifyJWT(obj, header) {
  const authHeader = header["authorization"];
	const uToken = authHeader?.split(" ")[1];
  let error = null;
  let data = null;

  if (!uToken) {
    error = {
      name: "authHeaderNotProvided",
      message: "No auth header found"
    };
    return {verified: false, error};
  };

	jwt.verify(uToken, process.env.JWT_ACCESS_KEY, (err, obj) => {
    if (err) return error = err;
    data = obj;
	});

  if (error) return {verified: false, error};
  return {verified: true, data};
}

module.exports = {
  createJWT,
  verifyJWT
}