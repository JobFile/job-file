// const db = require('../models')
const cookieController = {};
require('dotenv').config();

cookieController.setSSIDCookie = (req, res, next) => {
  try {
    res.cookie('ssid', res.locals.userID, {httpOnly: true});
    return next();
  } catch {
    return next({
      log: 'cookieController.setSSIDCookie error',
      message: {err: 'caught error setting ssid cookie'}
    });
  }
}

module.exports = cookieController;