const { Router } = require("express");
const router = new Router();

const recipeModel = require("../models/Recipe");

function findOrder(sortQuery, key) {
  if (!sortQuery) return 0;
  const query = sortQuery.find((c) => c.key === key);
  return !query ? 0 : +query.order;
}

router.get("/suggestions", async (req, res) => {
  const { query } = req;
  if (!query) return res.send({});

  let recipes = [];

  try {
    recipes = query["q"].length
      ? await recipeModel
          .find({
            title: new RegExp(query["q"], "i"),
          })
          .exec()
      : [];
  } catch (e) {
    console.log("error");
  }

  res.send(recipes);
});

router.get("/", async (req, res) => {
  const { query } = req;
  if (!query) return res.send({});

  let recipes = [];

  if (query.sort) {
    if (typeof query.sort === "string") {
      const [key, order] = query.sort.split("-");
      query.sort = [{ key, order: +order === 2 ? -1 : +order }];
    } else
      query.sort = query.sort.map((v) => {
        const [key, order] = v.split("-");
        return { key, order: +order === 2 ? -1 : +order };
      });
  }

  try {
    let sortCriteria = {
      title: findOrder(query.sort, "title"),
      cuisine: findOrder(query.sort, "cuisine"),
      calories: findOrder(query.sort, "calories"),
      createdAt: findOrder(query.sort, "createdAt"),
      // "instructions": findOrder(query.sort, "stepCount"),
    };

    sortCriteria = Object.fromEntries(
      Object.entries(sortCriteria).filter(([_, v]) => v)
    );

    recipes = query["q"].length
      ? await recipeModel
          .find({
            title: new RegExp(query["q"], "i"),
          })
          .sort(sortCriteria)
          .exec()
      : [];
  } catch (e) {
    console.log(e);
  }

  res.send(recipes);
});

module.exports = router;
