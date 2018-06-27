
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.renameColumn('plast_name', 'last_name')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.renameColumn('last_name', 'plast_name')
    })
  ])
};
