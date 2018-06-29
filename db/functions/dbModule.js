const knex = require('../../knex');

const tables = {
  1 : 'media_todos',
  2 : 'restaurant_todos',
  3 : 'book_todos',
  4 : 'product_todos'
}


module.exports = {

  newBookTodo: function (name, img, author, rating, due_date, type_id) {

    knex.insert({
      name: name,
      img: img,
      author: author,
      rating: rating,
      due_date: due_date,
      type_id: type_id
    }, 'id')
      .into('book_todos')
      .then(function (id) {
        console.log(`Success ${id} entered`);
      })
      .catchReturn();
  },


  newMediaTodo: function (name, img, showtime, rating, due_date, type_id) {

    knex.insert({
      name: name,
      img: img,
      showtime: showtime,
      rating: rating,
      due_date: due_date,
      type_id: type_id
    }, 'id')
      .into('media_todos')
      .then(function (id) {
        console.log(`Success ${id} entered`);
      })
      .catchReturn();
  },


  newProductTodo: function (name, img, description, price, website, rating, due_date, type_id) {

    knex.insert({
      name: name,
      img: img,
      description: description,
      price: price,
      website: website,
      rating: rating,
      due_date: due_date,
      type_id: type_id
    }, 'id')
      .into('product_todos')
      .then(function (id) {
        console.log(`Success ${id} entered`);
      })
      .catchReturn();
  },


  newRestaurantTodo: function (name, img, location, website, rating, due_date, type_id) {

    knex.insert({
      name: name,
      img: img,
      location:location,
      website: website,
      rating: rating,
      due_date: due_date,
      type_id: type_id
    }, 'id')
      .into('restaurant_todos')
      .then(function (id) {
        console.log(`Success ${id} entered`);
      })
      .catchReturn();
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
    knex.raw(`UPDATE ${tables[type_id]} SET is_done = NOT is_done WHERE id = ${id}`)
      .then(function () {
        console.log(`Todo ${idInt} is_done changed`);
      })
      .catchReturn();
  },

  // cb function needs to be used to return array of results
  getAllTodo: function (type_id, cb) {

    return knex.select()
      .from(tables[type_id])
      .asCallback(cb)
      .catchReturn()

  },

  // cb function needs to be used to return results object
  getTodo: function (id, type_id, cb) {

    return knex.first('*')
      .from(tables[type_id])
      .where('id', id)
      .asCallback(cb)
      .catchReturn()

  }
}