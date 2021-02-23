const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FavoritesSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  recipe_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Favorites = mongoose.model("userFavorites", FavoritesSchema);
module.exports = Favorites;

// made some changes to routes