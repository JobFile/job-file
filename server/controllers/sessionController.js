const db = require('../models')
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const cookieID = req.cookies.ssid;
  const findSessionQuery = `SELECT cookie_id FROM session
  WHERE cookie_id = $1`
  const values = [cookieID];
  db.query(findSessionQuery, values)
    .then((data) => {
      if (data.rows[0] !== undefined){
        return next();
      } 
    })
    .catch(() => {
      return next({
        log: 'sessionController.startSession',
        message: {err: 'Caught error starting session'}
      })
    });
}

sessionController.startSession = async (req, res, next) => {
  const id = res.locals.userID;
  const addSessionQuery = `INSERT INTO session (user_id)
  VALUES ($1)`
  const values = [id];
  try {
    const data = await db.query(addSessionQuery, values)
    return next();
  } catch { 
    return next({
      log: 'sessionController.startSession',
      message: {err: 'Caught error starting session'}
    })
  }
}

module.exports = sessionController;