const express = require ('express');
const router = express.Router();
// const Favorites = require('../models/add_to_favourites')

router.post("/addfav", (req, res) => {
    console.log("inside addfav route")
    console.log(req)
    console.log(res)
  } );