const express = require ('express');
const router = express.Router();
const Recipy = require('../models/recipy');

router.get('/todos', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Recipy.find({})
  .then((data) => res.json(data))
  .catch(next);
});

router.post('/todos', (req, res, next) => {
  if(req.body.action){
    Recipy.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Recipy.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;

// made some changes to routes