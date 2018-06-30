"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/functions/dbModule.js');
const todo = require('./todoObjectsMethods.js');
const search = require('../apis.js');
require('dotenv').config();

// get all todos
router.get('/', function (req, res) {
  db.getAllTodo((err, result) => {
    console.log(result);
    res.json({ err: err, result: result });
  });
});


// get single todo
router.get('/:hash', function (req, res) {
  db.getTodo(req.params.hash, (err, result) => {
    res.send({ err: JSON.stringify(err), result: JSON.stringify(result) });
  });
});


router.post('/', function (req, res) {
  const newtodo  = req.body.text;
  const lat = req.body.lat;
  const long = req.body.long;

  search.categorize(newtodo, process.env.WOLFRAMKEY)
  .then((result) => {
    todo.generatecard(newtodo, result, lat, long)
    .then((card) => {
      res.send(card);
    })
  })
  .catch((error) => {console.log(error)});
});


// edit todo
router.put('/:hash', function (req, res) {
  todo.changeCategory(req.body.name, req.body.category)
  .then((card) => {
    res.send(card);
    db.deleteTodo(req.params.hash);
  })
  
})


// toggle is_done bool
router.post('/:hash/isdone', function (req, res) {
  db.toggleIsDoneTodo();
  res.redirect(200, '/');
})


// delete todo
router.delete('/:hash', function (req, res) {
  db.deleteTodo(req.params.hash);
  res.send(200, 'Success Deleted Record');
})


module.exports = router;
