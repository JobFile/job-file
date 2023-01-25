const { Pool } = require('pg');
// TODO: require db
require('dotenv').config();

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};