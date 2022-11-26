const db = require('../models')

const userController = {}

userController.createUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  const newUser = `INSERT INTO Users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4) RETURNING *`
  const values = [firstName, lastName, email, password]

  db.query(newUser, values)
    .then(data => {
      // console.log(data.rows[0])
      if (data.rows[0] === undefined) {
        return next({
          log: 'createUser',
          message: { err: 'ERROR: Enter valid user' }
        })
      }
      res.locals.application = data.rows[0]
      console.log(res.locals.application)
      return next()
    }).catch(() => {next({
      log: 'userController.createUser',
      message: { err: 'error inside create user controller' }
    });
  });
}

// TODO: add a redirect to signup

userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body
  const verifyQuery = `SELECT u.email, u.password, u.user_id from Users u
  WHERE u.email = $1 AND u.password = $2`
  const values = [email, password]

  db.query(verifyQuery, values)
    .then(data => {
      console.log(data.rows[0])
      if (data.rows[0] === undefined) {
        return next({
          log: 'verifyUser',
          message: { err: 'ERROR: Enter valid user' }
        })
      }
      res.locals.userID = data.rows[0].user_id.toString();
      next();
    }).catch(() => { next({
      log: 'userController.verifyUser',
      message: { err: 'error inside create user controller' }
    });
  });
}

module.exports = userController;
