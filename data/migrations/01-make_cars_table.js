exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
      table.increments()
      table.string('vin', 17)
          .unique()
          .notNullable()
      table.string('make', 128)
          .notNullable()
      table.string('model', 128)
          .notNullable()
      table.integer('mileage')
          .notNullable()
      table.string('title', 128).defaultTo('clean')
      table.string('transmission', 128).defaultTo('automatic')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
