const express = require("express");
const router = express.Router();
const Recipy = require("../models/recipy");

router.get("/todos", async (req, res, next) => {
  const PAGE_SIZE = 30;
  const page = parseInt(req.query.page || "0");
  const totalRecipes = await Recipy.countDocuments({});
  const recipes = await Recipy.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({
    totalRecipes,
    totalPages: Math.ceil(totalRecipes / PAGE_SIZE),
    recipes,
  });
});

router.post("/todos", async (req, res, next) => {
  if (req.body.action) {
    console.log("in add recipe route");
    Recipy.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else if (req.body.ingredients) {
    console.log("in filter button route");
    let regex_array = req.body.ingredients.map(
      (ingredient) => new RegExp(`.*${ingredient}.*`, "i")
    );
    let db_query_array = [];
    regex_array.forEach((ingredient) =>
      db_query_array.push({ ingredients: { $regex: ingredient } })
    );
    const PAGE_SIZE = 30;
    const page = parseInt(req.query.page || "0");
    const totalFilteredRecipesCount = await Recipy.find({
      $and: db_query_array,
    }).countDocuments();
    const totalFilteredRecipes = await Recipy.find({ $and: db_query_array })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    console.log(db_query_array);
    Recipy.find({ $and: db_query_array }).then((data) =>
      res.json({
        totalFilteredRecipesCount,
        totalPages: Math.ceil(totalFilteredRecipesCount / PAGE_SIZE),
        totalFilteredRecipes,
      })
    );
  } else {
    console.log("in error route");
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", (req, res, next) => {
  Recipy.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;

// made some changes to routes
