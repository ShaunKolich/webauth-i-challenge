
exports.seed = function(knex) {
  // Deletes ALL existing entries
        return knex('login').insert([
          {
            user_name: 'Shaun',
            password: 'pass'
            
          },
          {
            user_name: 'JB',
            password: 'password'
          }
      ]);
 
};
