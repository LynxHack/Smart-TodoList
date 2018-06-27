const moment = require('moment');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({name: 'Film/Series ToDo', is_done: false, due_date: undefined, types_id: 1, users_id: 1}),
        knex('todos').insert({name: 'Restaurants, cafes, etc. (To eat)', is_done: false, due_date: undefined, types_id: 2, users_id: 1}),
        knex('todos').insert({name: 'Books (To read)', is_done: false, due_date: undefined, types_id: 3, users_id: 1}),
        knex('todos').insert({name: 'Products (To buy)', is_done: false, due_date: undefined, types_id: 4, users_id: 1}),
        knex('todos').insert({name: 'Jurrassic Park', is_done: false, due_date: moment('2018-09-01').format(), types_id: 1, users_id: 1}),
        knex('todos').insert({name: 'Rogue', is_done: false, due_date: moment('2018-10-01').format(), types_id: 2, users_id: 1}),
        knex('todos').insert({name: 'Harry Potter', is_done: false, due_date: moment('2018-11-01').format(), types_id: 3, users_id: 1}),
        knex('todos').insert({name: 'Brennivín', is_done: false, due_date: moment('2018-12-01').format(), types_id: 4, users_id: 1})
      ]);
    });
};
