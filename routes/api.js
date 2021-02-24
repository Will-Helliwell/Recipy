const express = require("express");
const router = express.Router();
const Todo = require("../models/recipy");

router.get("/todos", async (req, res, next) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const totalRecipes = await Todo.countDocuments({});
  const recipes = await Todo.find({})
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
    Todo.create(req.body)
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
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const totalFilteredRecipesCount = await Todo.find({
      $and: db_query_array,
    }).countDocuments();
    const totalFilteredRecipes = await Todo.find({ $and: db_query_array })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    console.log(db_query_array);
    Todo.find({ $and: db_query_array }).then((data) =>
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
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
