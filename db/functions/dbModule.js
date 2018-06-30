const knex = require('../../knex');

const tables = {
  1: 'media_todos',
  2: 'restaurant_todos',
  3: 'book_todos',
  4: 'product_todos'
}

const createNewTodo = function (type_id,
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

  knex.insert({
    types_id: type_id,
    name: name,
    img: img,
    showtime: showtime,
    rating: rating,
    description: description,
    price: price,
    website: website,
    due_date: due_date,
    author: author,
    address: address,
    is_done: is_done,
    latitude: latitude,
    longtitude: longitude,
    hash: hash
  }, 'id')
    .into('todos')
    .then(function (id) {
      console.log(`Success ${id} entered`);
    })
}

module.exports = {

  newTodo: function (card, lat, long) {
    console.log(card);

    switch (card.type_id) {
      case 1:
        createNewTodo(1, card.title, card.img, null, card.rating, null, null, null, null, null, null, null, null, null, card.hash);
        break;

      case 2:
        createNewTodo(2, card.name, card.img, null, card.rating, null, null, card.url, null, null, card.location, null, card.latitude, card.longitude, card.hash);
        break;

      case 3:
        createNewTodo(3, card.name, card.image, null, card.rating, null, null, null, null, card.author, null, false, null, null, card.hash);
        break;

      case 4:
        createNewTodo(4, card.name, null, null, null, null, null, card.website, null, null, null, null, null, null, card.hash);
        break;

    }
  },


  editTodo: function (type_id,
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

    knex(tables[type_id])
      .where({ id: id })
      .update({
        types_id: type_id,
    name: name,
    img: img,
    showtime: showtime,
    rating: rating,
    description: description,
    price: price,
    website: website,
    due_date: due_date,
    author: author,
    address: address,
    is_done: is_done,
    latitude: latitude,
    longtitude: longitude,
    hash: hash
      })
      .then(function (id) {
        console.log(`${id} modified`);
      })
      .catchReturn();
  },


  deleteTodo: function (hash) {

    knex('todos')
      .where({ hash: hash })
      .del()
      .then(function (id) {
        console.log(`${hash} Deleted from ${'todos'}`);
      })
      .catchReturn();

  },


  toggleIsDoneTodo: function (hash) {

    knex.raw(`UPDATE todos SET is_done = NOT is_done WHERE hash = ${hash}`)
      .then(function () {
        console.log(`Todo ${hash} is_done changed`);
      })
      .catchReturn();
  },


  // cb function needs to be used to return results object
  getTodo: function (hash, cb) {

    return knex.first('*')
      .from('todos')
      .where('hash', hash)
      .asCallback(cb);

  },


  getAllTodo: function (cb) {
    return knex.select('*')
    .from('todos')
    .asCallback(cb);
  }
}

editBookTodo: function (name, img, author, rating, due_date, type_id) {

  knex(tables[type_id])
    .where({ id: id })
    .update({
      name: (name || undefined),
      image: (img || undefined),
      author: (author || undefined),
      rating: (rating || undefined),
      due_date: (due_date || undefined)
    })
    .then(function (id) {
      console.log(`${id} modified`);
    })
    .catchReturn();
},


editMediaTodo: function (name, img, showtime, rating, due_date, type_id) {

  knex(tables[type_id])
    .where({ id: id })
    .update({
      name: (name || undefined),
      img: (img || undefined),
      showtime: (showtime || undefined),
      rating: (rating || undefined),
      due_date: (due_date || undefined)
    })
    .then(function (id) {
      console.log(`${id} modified`);
    })
    .catchReturn();
},


editProductTodo: function (name, img, description, price, website, rating, due_date, type_id) {

  knex(tables[type_id])
    .where({ id: id })
    .update({
      name: (name || undefined),
      img: (img || undefined),
      description: (description || undefined),
      price: (price || undefined),
      website: (website || undefined),
      rating: (rating || undefined),
      due_date: (due_date || undefined)
    })
    .then(function (id) {
      console.log(`${id} modified`);
    })
    .catchReturn();
},


editRestaurantTodo: function (name, img, location, website, rating, due_date, type_id) {

  knex(tables[type_id])
    .where({ id: id })
    .update({
      name: (name || undefined),
      img: (img || undefined),
      location: (location || undefined),
      website: (website || undefined),
      rating: (rating || undefined),
      due_date: (due_date || undefined)
    })
    .then(function (id) {
      console.log(`${id} modified`);
    })
    .catchReturn();
},