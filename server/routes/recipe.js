const { Router } = require("express");
const { verifyJWT } = require("../helpers/jwts");
const { fetchUserFromUID } = require("../helpers/fetchUser");
const router = new Router();
const recipeModel = require("../models/Recipe");
const userModel = require("../models/User");

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
    ratings: [],
  };

  serverData.createdBy = {
    id: user._id,
    name: user.uname,
  };

  const ingredients = {
    names: Object.entries(data).filter(([k]) =>
      /^ingredient-name:.+:$/.test(k)
    ),
    amt: Object.fromEntries(
      Object.entries(data).filter(([k]) => /^ingredient-amt:.+:$/.test(k))
    ),
  };

  const tags = Object.entries(data)
    .filter(([k]) => /^tag:.+:$/.test(k))
    .map((ent) => ent[1]);

  const allergens = Object.entries(data)
    .filter(([k]) => /^allergen:.+:$/.test(k))
    .map((ent) => ent[1]);

  const instructions = {
    text: Object.entries(data).filter(([k]) =>
      /^instruction-text:.+:$/.test(k)
    ),
    time: Object.fromEntries(
      Object.entries(data).filter(([k]) => /^instruction-time:.+:$/.test(k))
    ),
  };

  serverData.ingredients = [];
  ingredients.names.forEach(([key, name]) => {
    const id = key.match(/:.+:$/);
    const amt_key = Object.keys(ingredients.amt).find((keyname) =>
      new RegExp(id + "$").test(keyname)
    );
    const amt = ingredients.amt[amt_key];

    serverData.ingredients.push({ name, quantity: amt });
  });

  serverData.tags = tags;
  serverData.allergens = allergens;

  serverData.instructions = [];
  instructions.text.forEach(([key, instructionText]) => {
    const id = key.match(/:.+:$/);
    const time_key = Object.keys(instructions.time).find((keyname) =>
      new RegExp(id + "$").test(keyname)
    );
    const time = instructions.time[time_key] + "min";

    serverData.instructions.push({ instructionText, time });
  });

  serverData.imageUrl = req.file.buffer;

  req.body = serverData;
  next();
}

router.post("/create", recipePreprocess, (req, res) => {
  recipeModel
    .create(req.body)
    .then((doc) => {
      res.status(200).send({ message: "Created successfully!" });
    })
    .catch((err) => {
      res.send({ err });
    });
});

router.get("/my", async (req, res) => {
  const uid = req.query["uid"] || req.data.uid;
  const uuidReg =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  try {
    const userDoc = await userModel
      .findOne(uuidReg.test(uid) ? { uid } : { _id: uid }, ["uname"])
      .exec();

    const myRecipes = await recipeModel
      .find({
        "createdBy.name": userDoc.uname,
      })
      .exec();

    res.send(myRecipes);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allRecipes = await recipeModel.find().exec();
    res.send(allRecipes);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const rid = req.query["rid"];
  let recipe;

  try {
    recipe = await recipeModel.findOne({
      _id: rid?.toString(),
    });

  } catch (e) {
    return res.status(400).send({ message: "Recipe not found", error: e });
  }

  res.send(recipe.toJSON({ virtuals: true }));
});

router.get("/favourites", async (req, res) => {
  const uid = req.query["uid"] || req.data.uid;
  const uuidReg =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  try {
    const docs = await userModel
      .findOne(uuidReg.test(uid) ? { uid } : { _id: uid }, ["favourites"])
      .exec();
    const recipes = await recipeModel
      .find({
        _id: {
          $in: docs["favourites"],
        },
      })
      .exec();

    res.send(recipes);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.put("/favourites", async (req, res) => {
  const id = req.query["id"];
  if (!id) return res.status(400).send({ error: "Id not found" });

  try {
    await userModel
      .findOneAndUpdate(
        {
          uid: req.data.uid,
        },
        {
          $push: {
            favourites: [id],
          },
        }
      )
      .exec();

    res.send({ message: "added!" });
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
});

router.delete("/favourites", async (req, res) => {
  const id = req.query["id"];
  if (!id) return res.status(400).send({ error: "Id not found" });

  try {
    await userModel
      .findOneAndUpdate(
        {
          uid: req.data.uid,
        },
        {
          $pullAll: {
            favourites: [id],
          },
        }
      )
      .exec();

    res.send({ message: "removed!" });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

router.get("/review", async (req, res) => {
  const rid = req.query["rid"];

  try {
    let { ratings } = await recipeModel.findOne({ _id: rid }, ["ratings"]);
    res.send(ratings);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/review", async (req, res) => {
  try {
    const { uid, stars, review } = req.body;

    const userDoc = await userModel.findOne({_id: uid}, ["uname", "avatar"])
      .exec();
    
    await recipeModel
      .findOneAndUpdate(
        {
          _id: req.query["rid"],
        },
        {
          $push: {
            ratings: {
              user: {
                uname: userDoc.uname,
                avatar: userDoc.avatar,
                uid: userDoc._id
              },
              rating: stars,
              review,
            },
          },
        }
      )
      .exec();

    // await recipeModel
    //   .findOne({
    //     _id: req.query["rid"],
    //   }).populate("ratings.user", ["uname", "avatar", "_id"])
    //   .exec();
    res.send();
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/tags", async (req, res) => {
  const q = req.query["sort"];

  try {
    const tags = await recipeModel.find({
        tags: new RegExp(q, "i")
    }).exec();

    const data = [...new Set(tags.map(tag => (tag.tags)).flat())];
    res.send(data);
  } catch (error) {
    console.log("error");
    res.status(400).send({ error });
  }
})

module.exports = router;
