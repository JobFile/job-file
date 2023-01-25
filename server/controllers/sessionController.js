const db = require('../models');
const uuid = require('uuid');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const cookieID = req.cookies.ssid;
  const findSessionQuery = `SELECT cookie_id, user_id FROM sessions
  WHERE cookie_id = $1`;
  const values = [cookieID];
  db.query(findSessionQuery, values)
    .then((data) => {
      if (data.rows[0] !== undefined) {
        res.locals.isSSIDValid = true;
        console.log('row : ', data.rows);
        res.locals.userID = data.rows[0]['user_id'];
        console.log('userID: ', res.locals.userID);
        return next();
      } else {
        res.locals.isSSIDValid = false;
        return next();
      }
    })
    .catch(() => {
      return next({
        log: 'sessionController.isLoggedIn',
        message: { err: 'Caught error checking session' },
      });
    });
};

sessionController.startSession = async (req, res, next) => {
  const id = res.locals.userID;
  const ssidString = res.locals.ssidString;
  const addSessionQuery = `INSERT INTO sessions (cookie_id, user_id)
  VALUES ($1, $2)`;
  const values = [ssidString, id];
  try {
    const data = await db.query(addSessionQuery, values);
    return next();
  } catch {
    return next({
      log: 'sessionController.startSession',
      message: { err: 'Caught error starting session' },
    });
  }
};

module.exports = sessionController;
