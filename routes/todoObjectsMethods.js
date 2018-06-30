const search = require('../apis.js');
const defaultimage = 'https://static.vecteezy.com/system/resources/previews/000/085/097/non_2x/free-restaurant-interior-vector.jpg';

module.exports = {

<<<<<<< HEAD
  newmedia: function (name, img, showtime, rating, due_date, is_done) {
    this.type_id = 1;
=======
  card: function (type_id,
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
    longitude) {
    this.type_id = type_id;
>>>>>>> ecb6730eb673aa2856a1474506c3e86de0bb60df
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
<<<<<<< HEAD
  },

  newrestaurant: function (name, location, website, rating, latitude, longitude, due_date, is_done) {
    this.type_id = 2;
    this.name = name;
    //currently hardcoded image
    this.defaultimage = 'https://images.freeimages.com/images/large-previews/7b7/restaurant-interior-1478508.jpg';
    this.location = location;
=======
>>>>>>> ecb6730eb673aa2856a1474506c3e86de0bb60df
    this.latitude = latitude;
    this.longitude = longitude;
  },

  // post new todo

  generatecard: function (todo, category, lat, long) {
    return new Promise((resolve, reject) => {
      
      let card = {};
      switch (category) {
        case "book":
          search.booksearch(todo, process.env.GOODREADSKEY)
            .then((book) => {
              card = new this.card(3, book.title, book.image, null, book.rating, null, null, null, null, book.author, null, false, null, null);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "store":
          search.yelpsearch(todo, lat, long, 1)
            .then((rest) => {
              card = new this.card(2, rest.name, defaultimage, null, rest.rating, null, null, rest.url, null, null, rest.location, null, rest.latitude, rest.longitude);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "movie_tv":
          search.moviesearch(todo, process.env.IMDBKEY)
            .then((media) => {
              card = new this.card(1, media.title, media.image, null, media.rating, null, null, null, null, null, null, null, null, null);
              resolve(card);
            })
            .catch((error) => { reject(error) });
          break;

        case "product":
          search.googlesearch(todo, "amazon.ca", 1)
            .then((url) => {
              card = new this.card(4, todo, null, null, null, null, null, url.pop(), null, null, null, null, null, null);        
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
  }
}
