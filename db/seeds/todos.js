const moment = require('moment');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('todos').del(),
  knex('todos')
    .insert({
      name: 'Test Todo',
      img: 'https://static.vecteezy.com/system/resources/previews/000/085/097/non_2x/free-restaurant-interior-vector.jpg',
      showtime: 'now',
      rating: '4.5',
      description: 'some description',
      price: '9.99',
      website: 'https://www.google.com',
      author: 'J. K. Rowling',
      address: '90210',
      latitude: '49.282',
      longtitude: '-123.10834299999999',
      hash: 'g9U9x2t4UPGSik7pZXv01bB3XSs='
    })
])
};


// return Promise.all([
//   knex('media_todos').del(),
//   knex('book_todos').del(),
//   knex('restaurant_todos').del(),
//   knex('product_todos').del(),

//   // Inserts seed entries
//   knex('media_todos').insert({
//     name: 'Deadpool 2',
//     description: 'Deadpool 2 is a 2018 American superhero film based on the Marvel Comics character Deadpool, distributed by 20th Century Fox. It is the eleventh installment in the X-Men film series, and a direct sequel to the 2016 film Deadpool.',
//     img: 'https://en.wikipedia.org/wiki/File:Deadpool_2_poster.jpg#/media/File:Deadpool_2_poster.jpg',
//     showtime: 'https://www.cineplex.com/Showtimes/deadpool-2/cineplex-cinemas-coquitlam-and-vip?Date=6/28/2018',
//     rating: 'https://www.rottentomatoes.com/m/deadpool_2/#contentReviews',
//     is_done: false,
//     due_date: undefined,
//     type_id: 1
//   }),
//   knex('book_todos').insert({
//     name: 'Harry Potter',
//     img: 'https://commons.wikimedia.org/wiki/File:Harry_Potter_wordmark.svg#/media/File:Harry_Potter_wordmark.svg',
//     author: 'J. K. Rowling',
//     rating: 'https://www.goodreads.com/book/show/862041.Harry_Potter_Boxset?from_search=true',
//     website: 'https://www.amazon.ca/Harry-Potter-Box-Set-Collection/dp/1408856778/ref=sr_1_1?ie=UTF8&qid=1530221908&sr=8-1&keywords=harry+potter+book+set&dpID=51R3DwN8h8L&preST=_SX198_BO1,204,203,200_QL40_&dpSrc=srch',
//     due_date: undefined,
//     type_id: 3
//   }),
//   knex('restaurant_todos').insert({
//     name: 'Blue Water Cafe',
//     img: 'https://static.vecteezy.com/system/resources/thumbnails/000/085/097/small/free-restaurant-interior-vector.jpg',
//     location: 'https://goo.gl/maps/m9Jy3hqVrBA2',
//     website: 'https://www.bluewatercafe.net/',
//     rating: 'https://www.tripadvisor.ca/Restaurant_Review-g154943-d702167-Reviews-Blue_Water_Cafe-Vancouver_British_Columbia.html',
//     due_date: undefined,
//     type_id: 2
//   }),
//   knex('product_todos').insert({
//     name: 'bowflex',
//     description: 'Bowflex is the brand name for a series of fitness training equipment, marketed and sold by Nautilus, Inc.',
//     img: 'https://en.wikipedia.org/wiki/File:Bowflex_logo.svg#/media/File:Bowflex_logo.svg',
//     price: '$778.94',
//     website: 'http://www.nautilusinc.com/',
//     rating: 'https://www.amazon.com/Bowflex-Xtreme-SE-Home-Gym/product-reviews/B000RFBNA4',
//     due_date: undefined,
//     type_id: 4
//   })

// ])