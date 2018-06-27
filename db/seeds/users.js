
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({first_name: 'Leo', last_name: 'Ruan', email: 'not@email.com', password: 'password', avatars_id: '1'}),
        knex('users').insert({first_name: 'Lynx', last_name: 'Lu', email: 'not@email.com', password: 'password', avatars_id: '1'}),
        knex('users').insert({first_name: 'Jordan', last_name: 'Anders', email: 'not@email.com', password: 'password', avatars_id: '1'})
      ]);
    });
};
