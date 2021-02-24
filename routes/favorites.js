const express = require ('express');
const router = express.Router();
const User = require('../models/User')

// router.get('/addfav', (req, res) => {
//     // finds user
//     const user = User.findOne({ name: req.body.name } )
//     return user
//     .then(result => {
//         // then adds recipe to user favorites
//         result.favorites.push(req.body.recipe)
//         console.log(result.favorites.length)
//     })
//     //this will return all the data, exposing only the id and action field to the client
//     .then((data) => res.json(data))
//     .catch();
//   });

  router.post('/addfav', (req, res) => {
    // finds user
    const user = User.findOne({ name: req.body.name } )
    return user
    .then(result => {
        console.log(result.favorites)
        // then adds recipe to user favorites
        result.favorites.push(req.body.recipe)
        return result.favorites
    })
    //this will return all the data, exposing only the id and action field to the client
    .then((data) => res.json(data))
    .catch();
  });

  module.exports = router;