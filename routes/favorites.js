const express = require ('express');
const router = express.Router();

const User = require('../models/User')

  router.post('/addfav', (req, res) => {
    //   console.log(req.body)
      console.log(req.body.name)
    //   console.log(JSON.parse(req.body.recipe))
    // finds user
    const user = User.findOne({ name: req.body.name } )
    return user
    .then(result => {
        // console.log(req.body.recipe)
        result.favorites.push(req.body.recipe)
        result.save()
        console.log(result.favorites.length)
        // then adds recipe to user favorites
        // result.favorites.push(req.body.recipe)
        // return result.favorites
    })
    //this will return all the data, exposing only the id and action field to the client
    .then((data) => res.json(data))
    .catch();
  });

  router.post('/removefav', (req, res) => {
    //   console.log(req.body)
      console.log(req.body.name)
    //   console.log(JSON.parse(req.body.recipe))
    // finds user
    const user = User.findOne({ name: req.body.name } )
    return user
    .then(result => {
        console.log("inside removeFav")

        result.favorites.splice(result.favorites.findIndex(function(i){
            return i._id === `${req.body.recipe._id}`;
        }), 1);
        result.save();
        // result.favorites.findOneAndDelete({ "favorites": { "_id": `${req.body.recipe._id}`}})
        console.log(result.favorites.length)
        
    })
    .then((data) => res.json(data))
    .catch();
  });


  module.exports = router;