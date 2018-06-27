
exports.up = function (knex, Promise) {

  return knex.schema.createTable('avatars', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name');
    table.binary('img');
  }).createTable('types', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name');
  }).createTable('users', function (table) {
    table.increments('id').primary().unsigned();
    table.string('first_name');
    table.string('plast_name');
    table.string('email');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('avatars_id');
  }).createTable('todos', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name');
    table.boolean('is_done');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.dateTime('due_date');
    table.integer('types_id');
    table.integer('users_id');
  });

};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('avatars'),
    knex.schema.dropTable('types'),
    knex.schema.dropTable('todos'),
    knex.schema.dropTable('users'),
  ]);
};