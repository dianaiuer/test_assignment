const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');
var cors = require('cors');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({ origin: 'http://localhost:8080' }));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/movies', db.getMovies);

app.get('/users', db.getUsers)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
