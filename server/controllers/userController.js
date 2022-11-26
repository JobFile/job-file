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
    })})
}

module.exports = userController
