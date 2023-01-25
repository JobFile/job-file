// const db = require('../models')
const uuid = require('uuid');
const cookieController = {};
require('dotenv').config();

cookieController.setSSIDCookie = async (req, res, next) => {
  const ssidString = uuid.v4();
  const maxAge = 1000 * 60 * 60 * 2; //milliseconds, to minutes, to hours * 2
  try {
    res.cookie('ssid', ssidString, { maxAge, httpOnly: true }); //creating cookie session that stays for maxAge seconds.
    res.locals.ssidString = ssidString;
    return next();
  } catch {
    return next({
      log: 'cookieController.setSSIDCookie error',
      message: { err: 'caught error setting ssid cookie' },
    });
  }
};

module.exports = cookieController;
