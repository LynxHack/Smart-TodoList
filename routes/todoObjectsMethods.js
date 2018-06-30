const moment = require('moment');
const search = require('../apis.js');
const db = require('../db/functions/dbModule.js');
const defaultimage = 'https://images.unsplash.com/photo-1474898856510-884a2c0be546?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c273248fe3fdc5d05883723a21f176c1&auto=format&fit=crop&w=600&q=60';

module.exports = {

  card: function (types_id,
    name,
    img,
    showtime,
    rating,
    description,
    price,
    website,
    due_date,
    author,
    address,
    is_done,
    latitude,
    longitude,
    hash) {
    this.types_id = types_id;
    this.name = name;
    this.img = img;
    this.showtime = showtime;
    this.rating = rating;
    this.description = description;
    this.price = price;
    this.website = website;
    this.due_date = due_date;
    this.author = author;
    this.address = address;
    this.is_done = is_done;
    this.latitude = latitude;
    this.longitude = longitude;
    this.hash = hash
  },

  // post new todo

  generatecard: function (todo, category, lat, long) {
    return new Promise((resolve, reject) => {

      let randomHash = require('crypto').createHash('sha256').update(`todo${moment().format()}`).digest('hex');
      let card = {};
      switch (category) {
        case "book":
          search.booksearch(todo, process.env.GOODREADSKEY)
            .then((book) => {
              card = new this.card(3, book.title, book.image, null, book.rating, null, null, null, null, book.author, null, false, null, null, randomHash);
              db.newTodo(card, lat, long);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "store":
          search.yelpsearch(todo, lat, long, 1)
            .then((rest) => {
              card = new this.card(2, rest.name, defaultimage, null, rest.rating, null, null, rest.url, null, null, rest.location, null, rest.latitude, rest.longitude, randomHash);
              db.newTodo(card, lat, long);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "movie_tv":
          search.moviesearch(todo, process.env.IMDBKEY)
            .then((media) => {
              card = new this.card(1, media.title, media.image, null, media.rating, null, null, null, null, null, null, null, null, null, randomHash);
              db.newTodo(card, lat, long);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "product":
          search.walmartsearch(todo)
            .then((prod) => {
              card = new this.card(4, prod.name, prod.image, null, prod.rating, prod.description, prod.price, prod.url, null, null, null, null, null, null, randomHash);
              db.newTodo(card, lat, long);
              resolve(card);
            })
            .catch((error) => {
              reject(error)
            });
          break;

        default:
          resolve("Failed to identify cateogory");
      }
    });
  },

  changeCategory: function (todo, category) {

    let randomHash = require('crypto').createHash('sha256').update(`todo${moment().format()}`).digest('hex');
    switch (category) {
      case "book":
        search.booksearch(todo, process.env.GOODREADSKEY)
          .then((book) => {
            card = new this.card(3, book.title, book.image, null, book.rating, null, null, null, null, book.author, null, false, null, null, randomHash);
            db.newTodo(card, lat, long);
            resolve(card);
          })
          .catch((error) => { reject(error) });
        break;

      case "store":
        search.yelpsearch(todo, lat, long, 1)
          .then((rest) => {
            card = new this.card(2, rest.name, defaultimage, null, rest.rating, null, null, rest.url, null, null, rest.location, null, rest.latitude, rest.longitude, randomHash);
            db.newTodo(card, lat, long);
            resolve(card);
          })
          .catch((error) => { reject(error) });
        break;

      case "movie_tv":
        search.moviesearch(todo, process.env.IMDBKEY)
          .then((media) => {
            card = new this.card(1, media.title, media.image, null, media.rating, null, null, null, null, null, null, null, null, null, randomHash);
            db.newTodo(card, lat, long);
            resolve(card);
          })
          .catch((error) => { reject(error) });
        break;

      case "product":
        search.walmartsearch(todo)
          .then((prod) => {
            card = new this.card(4, prod.name, prod.image, null, prod.rating, prod.description, prod.price, prod.url, null, null, null, null, null, null, randomHash);
            db.newTodo(card, lat, long);
            resolve(card);
          })
          .catch((error) => {
            reject(error)
          });
        break;

      default:
        resolve("Failed to identify cateogory");
    }
  }
}
