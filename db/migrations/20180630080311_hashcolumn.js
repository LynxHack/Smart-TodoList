
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) {
      table.string('hash');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) { 
      table.dropColumn('hash');
     })
  ])
};
