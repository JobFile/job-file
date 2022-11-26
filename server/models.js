
const { Pool } = require('pg')
// TODO: require db
const PG_URI = 'postgres://tsnzxkew:8jsRfwoz7gVYHiirE96YrCXjLb7lf3cP@otto.db.elephantsql.com/tsnzxkew'

const pool = new Pool({
  connectionString: PG_URI
});




module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};