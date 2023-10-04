/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments() // Id field
        tbl.text('username').notNullable().unique()
        tbl.text('password').notNullable()
    })
    .createTable('cars', tbl => {
        tbl.increments() // Id field
        tbl.integer('car_year').notNullable()
        tbl.text('make').notNullable()
        tbl.text('model').notNullable()

        // Foreign key info to users table
        tbl.integer('users_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('fuel_info', tbl => {
        tbl.increments() // Id field
        tbl.integer('year').notNullable()
        tbl.integer('month').notNullable()
        tbl.integer('day').notNullable()
        tbl.float('total_miles').notNullable()
        tbl.float('miles_travled_on_tank').notNullable()
        tbl.float('price_per_gallon').notNullable()
        tbl.float('total_gallons').notNullable()

        // Foreign key info to cars table
        tbl.integer('cars_id')
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
    return knex.schema.dropTableIfExists('fuel_info').dropTableIfExists('cars').dropTableIfExists('users')
};