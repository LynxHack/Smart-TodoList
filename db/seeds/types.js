
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({name: 'media'}),
        knex('types').insert({name: 'restaurant'}),
        knex('types').insert({name: 'book'}),
        knex('types').insert({name: 'product'})
      ]);
    });
};
