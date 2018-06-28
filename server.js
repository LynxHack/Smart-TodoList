"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//yelp
var request = require('request');
var yelpkey = process.env.YELPKEY;

var restaurantname = 'pizza hut';
var latitude = 49; //replace this with coordinate obtain from client
var longitude = -123; //replace this with coordinate obtain from client
var limit = 3;  //default 20, max 50;
yelpsearch(restaurantname, latitude, longitude, limit);
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
    var data = JSON.parse(body);
    console.log(data);
  });
}

var imdbkey = process.env.IMDBKEY;
var moviename = 'titanic';
moviesearch(moviename, imdbkey);
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

categorize(test3, wolframkey);
function categorize(search, wolframkey){
  var stringquery = search.split(' ').join('+');
  request(`https://api.wolframalpha.com/v2/query?input=${stringquery}&format=image,plaintext&output=JSON&appid=${wolframkey}`, function (error, response, body) {
    if(error) throw error;

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

    console.log(stringquery);
    console.log(categories0, categories1);
    
    var result = categories0.concat(categories1);
    console.log(result);
  });
}


//google search - TODO it return a json, currently just logs
const scraper = require('google-search-scraper');
function googlesearch(searchstring, numresults){
  const options = {
    host: 'www.google.ca',
    query: searchstring,
    limit: numresults
  };
  scraper.search(options, function(err, url, meta) {
    if(err) throw err;
    if(url){
      console.log(url);
      //meta.title, meta.meta, meta.desc
    }
  });
}

//googlesearch('jurassic park amazon', 10);

app.post("/:newtodo", (req, res)=>{
  console.log('hi');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
