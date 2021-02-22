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

router.post("/todos", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else if (req.body.page) {
    pageNumber++;
    // .then(data => res.json(data))
    // .catch(next)
    console.log("pageNumber ");
    console.log(pageNumber);
  } else {
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
