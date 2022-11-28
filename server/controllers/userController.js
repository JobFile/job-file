const db = require('../models')
const bcrypt = require('bcryptjs');

const userController = {}

userController.createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  const newUser = `INSERT INTO Users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4) RETURNING *`
  const hash = await bcrypt.hash(password, 10);
  const values = [firstName, lastName, email, hash];
  db.query(newUser, values)
    .then(data => {
      if (data.rows[0] === undefined) {
        return next({
          log: 'createUser',
          message: { err: 'ERROR: Enter valid user' }
        })
      }
      res.locals.createdUser = data.rows[0];
      return next()
    }).catch(() => {
      return next({
      log: 'userController.createUser',
      message: { err: 'error inside create user controller' }
    });
  });
}

// TODO: add a redirect to signup

userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body
  const verifyQuery = `SELECT email, password, user_id FROM Users
  WHERE email = $1`
  const values = [email]

  db.query(verifyQuery, values)
    .then(data => {
      const bool = bcrypt.compareSync(password, data.rows[0].password);
      if (bool) {
        res.locals.userID = data.rows[0].user_id;
        return next();
      } else {
        return next({
          log: 'verifyUser',
          message: { err: 'ERROR: Enter valid user' }
        });
      }
    }).catch(() => { next({
      log: 'userController.verifyUser',
      message: { err: 'error inside create user controller' }
    });
  });
}

module.exports = userController;
