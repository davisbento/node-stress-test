knex-init:
	npx knex init

migrate-user:
	npx knex migrate:make create_users_table --esm

migrate-run:
	npx knex migrate:latest