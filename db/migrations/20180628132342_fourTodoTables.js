
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos'),
    knex.schema.createTable('media_todos', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.string('description');
      table.string('img');
      table.string('showtime');
      table.string('rating');
      table.date('due_date');
      table.boolean('is_done').defaultTo(false);
      table.timestamps(true, true);
    }),
    knex.schema.createTable('book_todos', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.string('img');
      table.string('author');
      table.string('rating');
      table.date('due_date');
      table.boolean('is_done').defaultTo(false);
      table.timestamps(true, true);
    }),
    knex.schema.createTable('restaurant_todos', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.string('img');
      table.string('location');
      table.string('website');
      table.string('rating');
      table.date('due_date');
      table.boolean('is_done').defaultTo(false);
      table.timestamps(true, true);
    }),
    knex.schema.createTable('product_todos', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.string('description');
      table.string('img');
      table.string('price');
      table.string('website');
      table.string('rating');
      table.date('due_date');
      table.boolean('is_done').defaultTo(false);
      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('product_todos'),
    knex.schema.dropTable('restaurant_todos'),
    knex.schema.dropTable('book_todos'),
    knex.schema.dropTable('media_todos'),
    knex.schema.createTable('todos', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name');
      table.boolean('is_done');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.dateTime('due_date');
      table.integer('types_id');
      table.integer('users_id');
    })
  ]);
};
