/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments() // Id field
        tbl.integer('car_year').notNullable()
        tbl.text('make').notNullable()
        tbl.text('model').notNullable()
    })
    .createTable('fuel_info', tbl => {
        tbl.increments() // Id field
        tbl.integer('year').notNullable()
        tbl.integer('month').notNullable()
        tbl.integer('day').notNullable()
        tbl.integer('total_miles').notNullable()
        tbl.integer('miles_travled_on_tank').notNullable()
        tbl.integer('price_per_gallon').notNullable()
        tbl.integer('total_gallons').notNullable()

        // Foreign key info to cars table
        tbl.integer('car_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cars')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fuel_info').dropTableIfExists('cars')
};