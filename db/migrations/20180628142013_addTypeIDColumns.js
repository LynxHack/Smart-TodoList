
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('media_todos', function (table) {
      table.integer('type_id')
    }),
    knex.schema.table('book_todos', function (table) {
      table.integer('type_id')
    }),
    knex.schema.table('restaurant_todos', function (table) {
      table.integer('type_id')
    }),
    knex.schema.table('product_todos', function (table) {
      table.integer('type_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('media_todos', function (table) {
      table.dropColumn('type_id')
    }),
    knex.schema.table('book_todos', function (table) {
      table.dropColumn('type_id')
    }),
    knex.schema.table('restaurant_todos', function (table) {
      table.dropColumn('type_id')
    }),
    knex.schema.table('product_todos', function (table) {
      table.dropColumn('type_id')
    }),
  ])
};
