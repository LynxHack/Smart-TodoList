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
    res.json({ err: err, result: result });
  });
});


// get single todo
router.get('/:id', function (req, res) {
  db.getTodo(req.params.id, (err, result) => {
    res.json({ err: err, result: result });
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
      db.newTodo(card, lat, long);
    })
  })
  .catch((error) => {console.log(error)});
});


// edit todo
router.put('/:id', function (req, res) {
  db.editTodo(req.body.id, req.body.name, req.body.due_date, req.body.types_id, req.body.users_id);
  res.redirect(200, '/');
})


// toggle is_done bool
router.post('/:id/isdone', function (req, res) {
  db.toggleIsDoneTodo();
  res.redirect(200, '/');
})


// delete todo
router.delete('/:id', function (req, res) {
  db.deleteTodo(req.params.id);
  res.redirect(200, '/');
})


module.exports = router;
