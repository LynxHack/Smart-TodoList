
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) { 
      table.string('img');
      table.string('showtime');
      table.string('rating');
      table.string('description');
      table.string('price');
      table.string('website');
      table.string('author');
      table.string('address');
      table.string('latitude');
      table.string('longtitude');
     })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) { 
      table.dropColumn('img');
      table.dropColumn('showtime');
      table.dropColumn('rating');
      table.dropColumn('description');
      table.dropColumn('price');
      table.dropColumn('website');
      table.dropColumn('author');
      table.dropColumn('address');
      table.dropColumn('latitude');
      table.dropColumn('longtitude');
     })
  ])
};
