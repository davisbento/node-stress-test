Just a simple boilerplate of a stress test using Node and K6.

Tools:

- Node with HTTP std lib
- Knex
- PostgreSQL
- K6
- Docker Compose
- Grafana
- InfluxDB

# Getting Started

Up all containers

```
docker-compose up --build
```

Create the table

```
make migrate-run
```

Run the tests

```
make test
```

## Grafana URL

http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s
