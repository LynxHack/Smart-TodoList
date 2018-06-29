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

function newmedia(name, img, showtime, rating, due_date, is_done){
  this.type_id = 1;
  this.img     = img;
  this.showtime= showtime;
  this.rating  = rating;
  this.due_date= due_date;
  this.is_done = is_done;
}

function newproduct(name, img, description, price, website, rating, due_date, is_done){
  this.type_id = 4;
  this.img = img;
  this.description = description;
  this.price = price;
  this.website = website;
  this.rating = rating;
  this.due_date = due_date;
  this.is_done  = is_done;
}

function newbook(name, img, author, rating, duedate, is_done){
  this.type_id = 3;
  this.name    = name;
  this.img = img;
  this.author  = author;
  this.rating  = rating;
  this.duedate = duedate;
  this.is_done = is_done;
}

function newrestaurant(name, location, website, rating, latitude, longitude, due_date, is_done){
  this.type_id = 2;
  this.name = name;
  //currently hardcoded image
  this.defaultimage = 'https://static.vecteezy.com/system/resources/previews/000/085/097/non_2x/free-restaurant-interior-vector.jpg';
  this.location = location;
  this.latitude = latitude;
  this.longitude = longitude;
  this.website = website;
  this.rating = rating;
  this.due_date = due_date;
  this.is_done = is_done;
}

// post new todo
router.post('/', function (req, res) {
  const newtodo  = req.body.text;
  const lat = req.body.lat;
  const long = req.body.long;

  search.categorize(newtodo, process.env.WOLFRAMKEY)
  .then((result) =>{
    let card = {};
    console.log("category of ", newtodo, " is ", result);
    switch (result){
      case "book":
        search.booksearch(newtodo, process.env.GOODREADSKEY)
        .then((book) =>{
          card = new newbook(book.title,book.image,book.author,book.rating, null, false);
          res.send(card); //send back to client, change this
        })
        .catch((error) => res.send(error));
        break;
      case "store":
        search.yelpsearch(newtodo, Math.round(Number(lat)), Math.round(Number(long)), 1)
          .then((rest) => {
            card = new newrestaurant(rest.name, rest.location, rest.url, rest.rating, rest.latitude, rest.longitude, null, false);
            res.send(card);
          })
          .catch((error) => res.send(error));
        break;

      case "movie_tv":
        // search.book(newtodo, process.env.GOODREADSKEY)
        // .then((name, img, author, rating) =>{
        //   card = new newbook(name,img,author,rating, null);
        //   res.send(card); //send back to client, change this
        // })
        // .catch((error) => res.send(error));
        //res.send("category = movietv");
        break;

      case "product":
        // search.book(newtodo, process.env.GOODREADSKEY)
        // .then((name, img, author, rating) =>{
        //   card = new newbook(name,img,author,rating, null);
        //   res.send(card); //send back to client, change this
        // })
        // .catch((error) => res.send(error));
        //res.send("cateogry = product");
        break;

      default:
        //res.send("Failed to identify cateogory");
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
