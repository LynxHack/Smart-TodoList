const knex = require('../../knex');

module.exports = {

  newTodo: function (name, due_date, types_id, users_id) {

    knex.insert({
      name: name,
      is_done: false,
      due_date: (due_date || undefined),
      types_id: types_id,
      users_id: users_id
    }, 'id')
      .into('todos')
      .then(function (id) {
        console.log(`Success ${id} entered`);
      })
      .catchReturn();
  },


  deleteTodo: function (id) {

    knex('todos')
      .where({ id: id })
      .del()
      .then(function (id) {
        console.log(`${id} Deleted`);
      })
      .catchReturn();

  },

  // Null args or incorrect format will result in data being stored as undefined
  editTodo: function (id, name, due_date, types_id, users_id) {
    
    knex('todos')
      .where({ id: id })
      .update({
        name: (name || undefined),
        due_date: (due_date || undefined),
        types_id: (types_id || undefined),
        users_id: (users_id || undefined)
      })
      .then(function (id) {
        console.log(`${id} modified`);
      })
      .catchReturn();
  },


  toggleIsDoneTodo: function (id) {

    const idInt = id;
    knex.raw(`UPDATE todos SET is_done = NOT is_done WHERE id = ${id}`)
      .then(function () {
        console.log(`Todo ${idInt} is_done changed`);
      })
      .catchReturn();
  },

  // cb function needs to be used to return array of results
  getAllTodo: function (cb) {

    return knex.select()
      .from('todos')
      .asCallback(cb)
      .catchReturn()

  },

  // cb function needs to be used to return results object
  getTodo: function (id, cb) {

    return knex.first('*')
      .from('todos')
      .where('id', id)
      .asCallback(cb)
      .catchReturn()

  }
}