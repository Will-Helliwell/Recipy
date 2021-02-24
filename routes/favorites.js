const express = require ('express');
const router = express.Router();
const User = require('../models/User')

// router.post('/addfav', (req, res, next) => {
//     if(req.body){
//         console.log('inside /addfav')
//       User.findOne({ name: "Jordan Henderson"})
//         .then(data => res.json(data))
//         .catch(next)
//     }else {
//       res.json({
//         error: "The input field is empty"
//       })
//     }
//   });

  router.post('/addfav', (req, res) => {
    // finds user
    const user = User.findOne({ name: req.body.name } )
    return user
    .then(result => {
        // then adds recipe to user favorites
        result.favorites.push(req.body.recipe)
        console.log(result.favorites.length)
    })
    //this will return all the data, exposing only the id and action field to the client
    .then((data) => res.json(data))
    .catch();
  });

  module.exports = router;