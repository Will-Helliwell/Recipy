const express = require ('express');
const router = express.Router();
const Todo = require('../models/recipy');

router.get('/todos', (req, res, next) => {
var paginate = 2;
var pageNumber = 1;
Todo.find({}).skip((pageNumber-1)*paginate).limit(paginate)
          //this will return all the data, exposing only the id and action field to the client
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/todos', (req, res, next) => {
  if(req.body.action){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  } else if (req.body.page) {
    var paginate = 2;
    const pageNumber = parseInt(req.body.page);
    Todo.find({}).skip((pageNumber-1)*paginate).limit(paginate)
    .then((data) => res.json(data))
  } else if (req.body.ingredient) {
    // return "ingredient param recognised by post route"
    var paginate = 1;
    Todo.find({}).skip((3)*paginate).limit(paginate)
    .then((data) => res.json(data))
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});


router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;
