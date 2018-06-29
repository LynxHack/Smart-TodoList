"use strict";

require('dotenv').config();
var request = require('request');

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
  
  // Test function call
  categorize(test0, wolframkey)
  .then((result) => {console.log(result)});
  
  // Identifiers for each category
  const store   = ['financ', 'restaurant', 'food', 'eat', 'company', 'lunch', 'dinner', 'dine', 'breakfast'];
  const book    = ['fiction', 'book', 'fict', 'novel', 'read', 'text', 'word', 'author', 'write', 'writer'];
  const movietv = ['movie', 'film', 'tv', 'tele', 'program', 'watch', 'series', 'documentary', 'show'];
  
  function classify(categories){
    let result = "product"; 
    let string = categories[0].toLowerCase();
  
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
          const url = `https://www.goodreads.com/book/show/${id}`;
          console.log(title, author, rating, image, url);
          //Modify to output to client
        });
    });
  }
  //booksearch('Pride and Prejudice', goodreadskey);
  
  
  const scraper = require('google-search-scraper');
  function googlesearch(searchstring, searchsite, numresults){
    return new Promise(function(resolve, reject){
      const results = [];
      const options = {
          host: 'www.google.ca',
          query: searchstring + " " + searchsite,
          limit: 100
        };
        scraper.search(options, function(err, url, meta) {
          if(err) reject(err);
  
          if(url && url.includes(searchsite) && !url.split('/').slice(-1).pop().includes("s?ie=UTF8") && results.length < numresults){
            results.push(url);
          }
          //meta.title, meta.meta, meta.desc
          if(results.length >= numresults){
            resolve(results);
          }
        });
    });  
  }
  //Waits until all results are completed
  // googlesearch('eon colfer', 'amazon.ca', 1)
  // .then((results)=>{
  //   console.log(results)
  // })
  // .catch((err) => {
  //   console.log(err)
  // });

  module.exports = {
    google      : googlesearch,
    "book"       : booksearch,
    "cat"         : categorize  ,
    movie       : moviesearch ,
    yelp        : yelpsearch
  }
  