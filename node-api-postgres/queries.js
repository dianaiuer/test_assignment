const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'netflix',
  password: 'I_will_definitely_pass_this_test',
  port: 5467,
});

const query = `
    SELECT
        film.film_id,
        film.rate,
        film.film_name,
        film.age_limit,
        film.released_data,
        film.country_of_origin,
        ARRAY_AGG(genre.g_name) AS genre_names,
        ARRAY_AGG(users.login) AS users,
        COUNT(DISTINCT watch.users_id) AS watch_numbers,
        dubbed.subtitles,
        dubbed.audio,
        languages.lang_name 
    FROM
      film
    LEFT JOIN
      film_genres ON film.film_id = film_genres.film_id
    LEFT JOIN
      genre ON film_genres.genre_id = genre.genre_id
    LEFT JOIN
      watch ON film.film_id = watch.film_id
    LEFT JOIN
      users ON watch.users_id = users.users_id
    LEFT JOIN
      dubbed ON film.film_id = dubbed.film_id
    LEFT JOIN
      languages ON dubbed.languages_id = languages.languages_id AND (dubbed.audio = true OR dubbed.subtitles = true)
    GROUP BY
      film.film_id, dubbed.subtitles, dubbed.audio, languages.lang_name;
`;

const queryGetUsers = `SELECT login from "users";`;

const getUsers = (request, response) => {
  pool.query(queryGetUsers, (error, results) => {
    if (error) {
      console.error('Error executing query:', err);
      return;
    }
    response.status(200).json(results.rows);
  });
};

const getMovies = (request, response) => {
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', err);
      return;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getMovies,
  getUsers,
};
