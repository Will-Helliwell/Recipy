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
    const user = User.findOne({ name: req.body.name} )
    // user.schema.obj.favorites.push("hello")
    // console.log(user.schema.obj)
    // console.log(user.schema.obj.favorites)
    return user
    //this will return all the data, exposing only the id and action field to the client
    .then((data) => res.json(data))
    .catch();
  });

  module.exports = router;