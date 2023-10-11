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
});

server.listen(PORT).on('listening', () => console.log(`Server is listening on port ${PORT}`));
