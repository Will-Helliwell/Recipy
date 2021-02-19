const mongoose = require("mongoose");
const Schema = mongoose.Schema;




//create schema for todo
const RecipySchema = new Schema({
    name: {
      type: String,
    },
    author: {
      type: String,
    },
    summary: {
      type: String,
    },
    skill_level: {
      type: String,
    },
    rating: {
      type: String,
    },
    rating_numbers: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    instructions: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    time: {
      prep: {
        type: String,
      },
      cook: {
        type: String,
      },
      active: {
        type: String,
      },
      inactive: {
        type: String,
      },
      ready: {
        type: String,
      },
      total: {
        type: String,
      },
    },
    servings: {
      type: String,
    },
    image: {
      type: String,
    },
});

//create model for todo
const Todo = mongoose.model("recipes", RecipySchema);

module.exports = Todo;


