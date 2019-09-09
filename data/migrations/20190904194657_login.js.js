
exports.up = function(knex) {
    return knex.schema.createTable('login', tbl => {
        tbl.increments();
        tbl.string('user_name', 128).notNullable().unique();
        tbl.string('password', 128).notNullable().unique();
  }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('login');
};
