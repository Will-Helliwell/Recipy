const express = require ('express');
const router = express.Router();
const Todo = require('../models/recipy');

router.get('/todos', (req, res, next) => {


 //------------------------
//  MyModel.find(query, fields, { skip: 10, limit: 5 }, function(err, results) { ... });

var paginate = 20;
var pageNumber = 1;
// Todo.find({}).sort('mykey', 1).skip((pageNumber-1)*paginate).limit(paginate)
Todo.find({}).skip((pageNumber-1)*paginate).limit(paginate)
    // .exec(function(err, result) {
        // Write some stuff here
        .then((data) => res.json(data))
        .catch(next);
    // });
//------------------------


  //this will return all the data, exposing only the id and action field to the client
  Todo.find({})
  .then((data) => res.json(data))
  .catch(next);
});

router.post('/todos', (req, res, next) => {
  if(req.body.action){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
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
