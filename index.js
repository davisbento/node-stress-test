import { createServer } from 'node:http';

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
});

server.listen(PORT).on('listening', () => console.log(`Server is listening on port ${PORT}`));
