import knex from 'knex';

import { credentials } from './credentials.js';

const pg = knex({
	client: 'pg',
	connection: {
		host: credentials.db.host,
		port: credentials.db.port,
		user: credentials.db.user,
		database: credentials.db.dbname,
		password: credentials.db.password,
		ssl: false
	}
});

export { pg };
