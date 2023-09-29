/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments() // Id field
        tbl.integer('year').notNullable()
        tbl.text('make').notNullable()
        tbl.text('model').notNullable()
    })
    .createTable('fuel_info', tbl => {
        tbl.increments() // Id field
        tbl.integer('year')
        tbl.integer('month')
        tbl.integer('day')
        tbl.integer('total_miles')
        tbl.integer('miles_travled_on_tank')
        tbl.integer('price_per_gallon')
        tbl.integer('total_cost')

        // Foreign key info to cars table
        tbl.integer('car_id')
            .unsigned()
            .references('id')
            .inTable('cars')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .then(() => {
        return knex.raw('UPDATE fuel_info SET year = CAST(strftime("%Y", "now") AS INTEGER)')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fuel_info').dropTableIfExists('cars')
};
