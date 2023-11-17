knex-init:
	npx knex init

migrate-user:
	npx knex migrate:make create_users_table --esm

migrate-run:
	npx knex migrate:latest

migrate-down:
	npx knex migrate:rollback

test:
	docker-compose run k6 run /scripts/load-test.js