
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurant_todos', function (table) {
      table.string('lat'),
      table.string('long')
   })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('restaurant_todos', function (table) {
      table.dropColumn('lat'),
      table.dropColumn('long')
   })
  ])
};
