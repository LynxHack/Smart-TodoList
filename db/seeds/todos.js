
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({name: 'Film/Series ToDo', due_date: date(), types_id: 1, users_id: 1}),
        knex('todos').insert({name: 'Restaurants, cafes, etc. (To eat)', due_date: date(), types_id: 2, users_id: 1}),
        knex('todos').insert({name: 'Books (To read)', due_date: date(), types_id: 3, users_id: 1}),
        knex('todos').insert({name: 'Products (To buy)', due_date: date(), types_id: 4, users_id: 1}),
        knex('todos').insert({name: 'Jurrassic Park', due_date: date(), types_id: 1, users_id: 1}),
        knex('todos').insert({name: 'Rogue', due_date: date(), types_id: 2, users_id: 1}),
        knex('todos').insert({name: 'Harry Potter', due_date: date(), types_id: 3, users_id: 1}),
        knex('todos').insert({name: 'Brennivín', due_date: date(), types_id: 4, users_id: 1})
      ]);
    });
};
