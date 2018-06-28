const moment = require('moment');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('media_todos').del(),
    knex('book_todos').del(),
    knex('restaurant_todos').del(),
    knex('product_todos').del(),

    // Inserts seed entries
    knex('media_todos').insert({
      name: 'Deadpool 2',
      description: 'Deadpool 2 is a 2018 American superhero film based on the Marvel Comics character Deadpool, distributed by 20th Century Fox. It is the eleventh installment in the X-Men film series, and a direct sequel to the 2016 film Deadpool.',
      img: 'https://en.wikipedia.org/wiki/File:Deadpool_2_poster.jpg#/media/File:Deadpool_2_poster.jpg',
      showtime: 'https://www.cineplex.com/Showtimes/deadpool-2/cineplex-cinemas-coquitlam-and-vip?Date=6/28/2018',
      rating: 'https://www.rottentomatoes.com/m/deadpool_2/#contentReviews',
      is_done: false,
      due_date: undefined
    }),
    knex('book_todos').insert({
      name: 'Harry Potter',
      img: 'https://commons.wikimedia.org/wiki/File:Harry_Potter_wordmark.svg#/media/File:Harry_Potter_wordmark.svg',
      author: 'J. K. Rowling',
      rating: 'https://www.goodreads.com/book/show/862041.Harry_Potter_Boxset?from_search=true',
      due_date: undefined
    }),
    knex('restaurant_todos').insert({
      name: 'Blue Water Cafe',
      img: 'https://static.vecteezy.com/system/resources/thumbnails/000/085/097/small/free-restaurant-interior-vector.jpg',
      location: 'https://goo.gl/maps/m9Jy3hqVrBA2',
      website: 'https://www.bluewatercafe.net/',
      rating: 'https://www.tripadvisor.ca/Restaurant_Review-g154943-d702167-Reviews-Blue_Water_Cafe-Vancouver_British_Columbia.html',
      due_date: undefined
    }),
    knex('product_todos').insert({
      name: 'bowflex',
      description: 'Bowflex is the brand name for a series of fitness training equipment, marketed and sold by Nautilus, Inc.',
      img: 'https://en.wikipedia.org/wiki/File:Bowflex_logo.svg#/media/File:Bowflex_logo.svg',
      price: '$778.94',
      website: 'http://www.nautilusinc.com/',
      rating: 'https://www.amazon.com/Bowflex-Xtreme-SE-Home-Gym/product-reviews/B000RFBNA4',
      due_date: undefined
    })

  ])
};