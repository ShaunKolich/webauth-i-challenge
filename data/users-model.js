const db = require('./dbconfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('login').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('login').where(filter);
}

function add(user) {
  return db('login')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('login')
    .where({ id })
    .first();
}