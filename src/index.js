import { createServer } from 'node:http';
import { pg } from './config/db.js';

const PORT = 8080;

const server = createServer(async (req, res) => {
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET'
	};

	if (req.method === 'OPTIONS') {
		res.writeHead(204, headers);
		res.end();
		return;
	}

	if (req.url === '/api') {
		res.writeHead(200, headers);
		res.end(JSON.stringify({ message: 'Hello World' }));
		return;
	}

	if (req.url === '/api/test') {
		pg.raw('SELECT 1+1 as result')
			.then((result) => {
				console.log('result: ', result);
				res.writeHead(200, headers);
				res.end(JSON.stringify({ message: 'Hello World' }));
				return;
			})
			.catch((err) => {
				console.error(err);
				res.writeHead(500, headers);
				res.end(JSON.stringify({ error: 'Error' }));
				return;
			});
	}

	if (req.url === '/api/users' && req.method === 'GET') {
		try {
			const users = await pg('users').select('*');
			res.writeHead(200, headers);
			res.end(JSON.stringify({ users }));
			return;
		} catch (err) {
			console.error(err);
			res.writeHead(500, headers);
			res.end(JSON.stringify({ error: 'Error' }));
			return;
		}
	}

	if (req.url === '/api/users' && req.method === 'POST') {
		try {
			const body = await new Promise((resolve, reject) => {
				let body = '';
				req.on('data', (chunk) => (body += chunk.toString()));
				req.on('end', () => resolve(body));
				req.on('error', (err) => reject(err));
			});
			const user = JSON.parse(body);
			// make as base64
			const hashedPassword = Buffer.from(user.password).toString('base64');
			const userToAdd = {
				...user,
				password: hashedPassword
			};
			const [id] = await pg('users').insert(userToAdd).returning('id');
			res.writeHead(200, headers);
			res.end(JSON.stringify({ id }));
			return;
		} catch (err) {
			console.error(err);
			res.writeHead(500, headers);
			res.end(JSON.stringify({ error: 'Error' }));
			return;
		}
	}
});

server.listen(PORT).on('listening', () => console.log(`Server is listening on port ${PORT}`));
