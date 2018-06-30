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
  longitude) {

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
    longtitude: longitude
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
        createNewTodo(1, card.title, card.img, null, card.rating, null, null, null, null, null, null, null, null, null);
        break;

      case 2:
        createNewTodo(2, card.name, card.img, null, card.rating, null, null, card.url, null, null, card.location, null, card.latitude, card.longitude);
        break;

      case 3:
        createNewTodo(3, card.name, card.image, null, card.rating, null, null, null, null, card.author, null, false, null, null);
        break;

      case 4:
        createNewTodo(4, card.name, null, null, null, null, null, card.website, null, null, null, null, null, null);
        break;

    }
  },


  deleteTodo: function (id, type_id) {

    knex(tables[type_id])
      .where({ id: id })
      .del()
      .then(function (id) {
        console.log(`${id} Deleted from ${tables[type_id]}`);
      })
      .catchReturn();

  },


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


  toggleIsDoneTodo: function (id, type_id) {

    const idInt = id;
    knex.raw(`UPDATE todos SET is_done = NOT is_done WHERE id = ${id}`)
      .then(function () {
        console.log(`Todo ${idInt} is_done changed`);
      })
      .catchReturn();
  },


  // cb function needs to be used to return results object
  getTodo: function (id, cb) {

    return knex.first('*')
      .from('todos')
      .where('id', id)
      .asCallback(cb);

  },


  getAllTodo: function (cb) {
    return knex.select('*')
    .from('todos')
    .asCallback(cb);
  }
}