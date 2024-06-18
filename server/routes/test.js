const { Router } = require("express");
const { createJWT, verifyJWT } = require("../helpers/jwts");
const router = Router();

router.post("/", (req, res) => {
  const key = createJWT(req.body);

  res.send({
    key
  });
});

router.get("/auth", (req, res) => {
  const data = verifyJWT(req.body, req.headers);

  res.send(data);
});

module.exports = router;