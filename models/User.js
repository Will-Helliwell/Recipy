const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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


// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  favorites: [RecipySchema],
});

const User = mongoose.model("users", UserSchema);
module.exports = User;

// made some changes to routes