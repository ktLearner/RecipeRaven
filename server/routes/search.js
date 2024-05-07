const { Router } = require("express");
const router = new Router();

const recipeModel = require("../models/Recipe");

router.get("/", async (req, res) => {
  const { query } = req;
  if (!query) return res.send({});

  let recipes = [];

  try {
    recipes = query["q"].length ? await recipeModel.find({
      "title": new RegExp(query["q"], "i")
    }).exec() : [];
  } catch(e) {
    console.log("error");
  }

  res.send(recipes);
});

module.exports = router;
