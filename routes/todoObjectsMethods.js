const search = require('../apis.js');


module.exports = {

  newmedia: function (name, img, showtime, rating, due_date, is_done) {
    this.type_id = 1;
    this.img = img;
    this.showtime = showtime;
    this.rating = rating;
    this.due_date = due_date;
    this.is_done = is_done;
    this.type_id = 1;
  },

  newproduct: function (name, img, description, price, website, rating, due_date, is_done) {
    this.type_id = 4;
    this.img = img;
    this.description = description;
    this.price = price;
    this.website = website;
    this.rating = rating;
    this.due_date = due_date;
    this.is_done = is_done;
    this.type_id = 4;
  },

  newbook: function (name, img, author, rating, duedate, is_done) {
    this.type_id = 3;
    this.name = name;
    this.img = img;
    this.author = author;
    this.rating = rating;
    this.duedate = duedate;
    this.is_done = is_done;
    this.type_id = 3;
  },

  newrestaurant: function (name, location, website, rating, latitude, longitude, due_date, is_done) {
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
    this.type_id = 2;
  },

  // post new todo

  generatecard: function (todo, category, lat, long) {
    return new Promise((resolve, reject) => {
      let card = {};
      switch (category) {
        case "book":
          search.booksearch(todo, process.env.GOODREADSKEY)
            .then((book) => {
              card = new this.newbook(book.title, book.image, book.author, book.rating, null, false, book.is_done);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "store":
          search.yelpsearch(todo, lat, long, 1)
            .then((rest) => {
              card = new this.newrestaurant(rest.name, rest.location, rest.url, rest.rating, rest.latitude, rest.longitude, null, false, rest.is_done);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "movie_tv":
          search.moviesearch(todo, process.env.IMDBKEY)
            .then((media) => {
              card = new this.newmedia(media.title, media.image, null, media.rating, null, false, media.is_done);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "product":
          search.googlesearch(todo, "amazon.ca", 1)
            .then((url) => {
              resolve({ producturl: url.pop() });
            })
            .catch((error) => {
              reject(error)
            });
          break;

        default:
          resolve("Failed to identify cateogory");
      }
    });
  }
}