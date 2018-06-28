
exports.up = function(knex, Promise) {
  knex.schema.table('book_todos', function (table) {
    table.string('website')
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('book_todos', function (table) {
      table.dropColumn('website')
    }),
  ])
};
