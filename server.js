"use strict";

require('dotenv').config();

const PORT            = process.env.PORT || 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const methodOverride  = require("method-override");
const sass            = require("node-sass-middleware");
const app             = express();


const morgan          = require('morgan');

// Seperated Routes for each Resource
const usersRoutes     = require("./routes/users");
const todosRoutes     = require("./routes/todos");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// app.get('/test', (req,res)=>{
//   //call the Wolven api over here.

// });


//yelp
var request = require('request');
var yelpkey = process.env.YELPKEY;

// var restaurantname = 'pizza hut';
// var latitude = 49; //replace this with coordinate obtain from client
// var longitude = -123; //replace this with coordinate obtain from client
// var limit = 3;  //default 20, max 50;
//yelpsearch(restaurantname, latitude, longitude, limit);

function yelpsearch(rest_name, lat, long, numitems){
  const restaurantname = rest_name.split(' ').join('+');
  var options = {
    url: `https://api.yelp.com/v3/businesses/search?term=${restaurantname}&latitude=${latitude}&longitude=${longitude}&limit=${limit}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${yelpkey}`
    },
  };
  request(options, function(err, res, body){
    if(err){console.log(err);}
    const data = JSON.parse(body);
    const name = data.businesses[0].name;
    const rating = data.businesses[0].rating;
    const location = data.businesses[0].location.display_address.join(', ');
    const phone = data.businesses[0].phone;
    const latitude = data.businesses[0].coordinates.latitude;
    const longitude = data.businesses[0].coordinates.longitude;
    console.log(name, rating, location, phone, latitude, longitude);
  });
}

//var moviename = 'titanic';
//moviesearch(moviename, imdbkey);

var imdbkey = process.env.IMDBKEY;
function moviesearch(moviestring, imdbkey){
  const moviename = moviestring.split(' ').join('+');
  request(`http://omdbapi.com/?t=${moviename}&apikey=${imdbkey}`, function (error, response, body) {
    if(error) throw err;
    console.log(response.body); // Print the response status code if a response was received
    //insert something to send info back to client end
  });
};

var test0 = 'bible';
var test1 = 'Harry Potter';
var test2 = 'pizza hut';
var test3 = 'mcdonalds';
var test4 = 'burger king';
var test5 = 'titanic';
var test6 = 'artemis fowl';
var test7 = 'avengers';
var test8 = 'breaking bad';
var test9 = 'fresh slice';

var wolframkey = process.env.WOLFRAMKEY;

//Test function call
// categorize(test0, wolframkey)
// .then((result) => {console.log(result)});

// To improve list
const store   = ['financ', 'restaurant', 'food', 'eat', 'company'];
const book    = ['fiction', 'book', 'fict', 'novel', 'read', 'text', 'word'];
const movietv = ['movie', 'film', 'tv', 'tele', 'program', 'watch'];

function classify(categories){
  let result = "product";
  const string = categories[0].toLowerCase();

  //if the first result does not have a defined category, try others
  if(!store.concat(book, movietv).some(e => string.includes(e)))
    string = categories.join(',').toLowerCase();
  if(store.some(e => string.includes(e)))
    result = "store";
  else if(movietv.some(e => string.includes(e)))
    result = "movie_tv";
  else if(book.some(e => string.includes(e)))
    result = "book";

  return result;
}

function categorize(search, wolframkey){
  return new Promise((resolve, reject) => {
    var stringquery = search.split(' ').join('+');
    request(`https://api.wolframalpha.com/v2/query?input=${stringquery}&format=image,plaintext&output=JSON&appid=${wolframkey}`, function (error, response, body) {
      if(error) reject(error);

      var parsedresponse = JSON.parse(response.body);
      var categories0 = [];
      var categories1 = parsedresponse.queryresult.datatypes.split(',');

      if(parsedresponse.queryresult.hasOwnProperty('assumptions')){
        var assumptions = parsedresponse.queryresult.assumptions;
        var result = Array.isArray(assumptions) ? assumptions[0].values : assumptions.values;
        for(var element in result){
          categories0.push(result[element].name);
        }
      }
      var categories = categories0.concat(categories1);
      resolve(classify(categories));
    });
  });
}

var parseString = require('xml2js').parseString
const goodreadskey = process.env.GOODREADSKEY;
function booksearch(bookname, key){
  const bookstring = bookname.split(' ').join('+');
  const url = `https://www.goodreads.com/search.xml?key=${key}&q=${bookstring}`;
  request(url, (error, response, body) => {
      if(error) reject(error);
      parseString(body, function (err, result) {
        const image = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].image_url[0];
        const author = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0];
        const title = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0];
        const rating = result.GoodreadsResponse.search[0].results[0].work[0].average_rating[0];
        const id = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].id[0]["_"];
        const url = `https://www.goodreads.com/book/show/${id};`
        console.log(title, author, rating, image, url);
        //Modify to output to client
      });
  });
}
//booksearch('Pride and Prejudice', goodreadskey);


const scraper = require('google-search-scraper');
function googlesearch(searchstring, numresults){
  return new Promise(function(resolve, reject){
    const results = [];
    const options = {
        host: 'www.google.ca',
        query: searchstring,
        limit: numresults
      };
      scraper.search(options, function(err, url, meta) {
        if(err) reject(err);
        if(url){
          //console.log(url);
          results.push(url);
          //meta.title, meta.meta, meta.desc
          if(results.length === numresults){
            resolve(results);
          }
        }
      });
  });
}
//Waits until all results are completed
// googlesearch('jurassic park amazon.ca', 10)
// .then((results)=>{console.log(results)})
// .catch((err) => {console.log(err)});

app.post("/:newtodo", (req, res)=>{
  console.log('hi');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
