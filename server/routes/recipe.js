const { Router } = require("express");
const { verifyJWT } = require("../helpers/jwts");
const { fetchUserFromUID } = require("../helpers/fetchUser");
const router = new Router;
const recipeModel = require("../models/Recipe");
const auth = require("../middlewares/auth");

async function recipePreprocess(req, res, next) {
  const { data: userData, error } = verifyJWT(req.cookies["auth-token"]);
  if (error) return res.status(400).send();

  const user = await fetchUserFromUID(userData?.uid);
  const data = req.body;

  const serverData = {
    title: data.name,
    description: data.description,
    calories: data.calories,
    cuisine: data.cuisine,
    ratings: []
  };
  
  serverData.createdBy = {
    id: user._id,
    name: user.uname
  };

  const ingredients = {
    names: Object
      .entries(data)
      .filter(([k]) => /^ingredient-name:.+:$/.test(k)),
    amt: Object.fromEntries(Object
      .entries(data)
      .filter(([k]) => /^ingredient-amt:.+:$/.test(k)))
  };

  const tags = Object
    .entries(data)
    .filter(([k]) => /^tag:.+:$/.test(k))
    .map(ent => ent[1]);

  const allergens = Object
    .entries(data)
    .filter(([k]) => /^allergen:.+:$/.test(k))
    .map(ent => ent[1]);
  
  const instructions = {
    text: Object
      .entries(data)
      .filter(([k]) => /^instruction-text:.+:$/.test(k)),
    time: Object.fromEntries(Object
    .entries(data)
    .filter(([k]) => /^instruction-time:.+:$/.test(k))),
  };

  serverData.ingredients = [];
  ingredients.names.forEach(([key, name]) => {
    const id = key.match(/:.+:$/);
    const amt_key = Object
      .keys(ingredients.amt)
      .find(keyname => new RegExp(id + "$").test(keyname));
    const amt = ingredients.amt[amt_key];

    serverData.ingredients.push({ name, quantity: amt });
  });

  serverData.tags = tags;
  serverData.allergens = allergens;
  
  serverData.instructions = [];
  instructions.text.forEach(([key, instructionText]) => {
    const id = key.match(/:.+:$/);
    const time_key = Object
      .keys(instructions.time)
      .find(keyname => new RegExp(id + "$").test(keyname));
    const time = instructions.time[time_key] + "min";
    
    serverData.instructions.push({ instructionText, time });
  });
  
  serverData.imageUrl = req.file.buffer;

  req.body = serverData;
  next();
}

router.post("/create", recipePreprocess, (req, res) => {
  recipeModel.create(req.body)
    .then(doc => {
      res.status(200).send({ message: "Created successfully!" });
    })
    .catch(err => {
      res.send({ err });
    });
});

router.get("/my", auth, async (req, res) => {
  const myRecipes = await recipeModel.find({
    "createdBy.name" : req.data.uname
  }).exec();
  
  res.send(myRecipes);
});

router.get("/all", auth, async (req, res) => {
  const allRecipes = await recipeModel.find().exec();
  res.send(allRecipes);
});

router.get("/", auth, async (req, res) => {
  const rid = req.query["rid"];

  const recipe = await recipeModel.findOne({
    _id: rid?.toString()
  });
  
  if (!recipe) return res.status(400).send({ message: "Recipe not found" });

  res.send(recipe);
});

module.exports = router;