/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('users', (table) => {
		table.increments('id');
		table.string('name').notNullable();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
		table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('users');
}
