
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl.string('vin', 17).notNullable().unique();
    tbl.string("make", 128).notNullable()
    tbl.string("model", 128).notNullable()
    tbl.integer("mileage").notNullable()
    tbl.string("title", 128).notNullable().defaultTo('clean')
    tbl.string("transmission", 128).notNullable().defaultTo("auto")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('cars');
};
