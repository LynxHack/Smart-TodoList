"use strict";

const express = require('express');
const router = express.Router();
const db = require('../db/functions/dbModule.js')
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

function newmedia(name, img, showtime, rating, due_date){
  this.type_id = 1;
  this.img     = img;
  this.showtime= showtime;
  this.rating  = rating;
  this.due_date= due_date;
}

function newproduct(name, img, description, price, website, rating, due_date){
  this.type_id = 4;
  this.img = img;
  this.description = description;
  this.price = price;
  this.website = website;
  this.rating = rating;
  this.due_date = due_date;
}

function newbook(name, img, author, rating, duedate){
  this.type_id = 3;
  this.name    = name;
  this.img = img;
  this.author  = author;
  this.rating  = rating;
  this.duedate = duedate;
}

function newrestaurant(name, img, location, website, rating, due_date){
  this.type_id = 2;
  this.name = name;
  this.img = img;
  this.location = location;
  this.website = website;
  this.rating = rating;
  this.due_date = due_date;
}

// post new todo
router.post('/', function (req, res) {
  const newtodo  = String(Object.keys(req.body)[0]);
  console.log(newtodo);
  search.cat(newtodo, process.env.WOLFRAMKEY)
  .then((result) =>{
    let card = {};
    switch (result){
      case "book":
        search.book(newtodo, process.env.GOODREADSKEY)
        .then(({title, image, author, rating, url}) =>{
          console.log(title,image, author, rating);
          card = new newbook(title,image,author,rating, null);
          console.log(card);
          res.send(card); //send back to client, change this
        })
        .catch((error) => res.send(error));
        break;
      
      case "store":
        // search.yelp(newtodo, process.env.YELPKEY)
        // .then((name, img, author, rating) =>{
        //   card = new newbook(name,img,author,rating, null);
        //   res.send(card); //send back to client, change this
        // })
        // .catch((error) => res.send(error));
        res.send("category = store");
        break;

      case "movie_tv":
        // search.book(newtodo, process.env.GOODREADSKEY)
        // .then((name, img, author, rating) =>{
        //   card = new newbook(name,img,author,rating, null);
        //   res.send(card); //send back to client, change this
        // })
        // .catch((error) => res.send(error));
        res.send("category = movietv");
        break;

      case "product":
        // search.book(newtodo, process.env.GOODREADSKEY)
        // .then((name, img, author, rating) =>{
        //   card = new newbook(name,img,author,rating, null);
        //   res.send(card); //send back to client, change this
        // })
        // .catch((error) => res.send(error));
        res.send("cateogry = product");
        break;

      default:
        res.send("Failed to identify cateogory");
    }
    //res.send(newtodo + " category: " + result);
  });


  //db.newTodo(req.body.name, req.body.due_date, req.body.types_id, req.body.users_id);
  //res.render(200, '/', { err: err });
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
