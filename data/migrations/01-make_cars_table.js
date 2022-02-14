exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {})
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
