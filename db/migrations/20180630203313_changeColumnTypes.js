const table = 'todos';

exports.up = function (knex, Promise) {
  return Promise.all([
      knex.raw('ALTER TABLE todos ALTER COLUMN website TYPE text'),
      knex.raw('ALTER TABLE todos ALTER COLUMN description TYPE text')
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('todos', function (table) {
      knex.raw('ALTER TABLE todos ALTER COLUMN website TYPE string'),
      knex.raw('ALTER TABLE todos ALTER COLUMN description TYPE string')
    })
  ])
};
