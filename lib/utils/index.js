const jwtAdmin = require('./jwtAdmin');
const message = require('./message');
const mailCtrl = require('./mailCtrl');
const DBInit = require('./dbInit');

module.exports = {
  jwtAdmin,
  message,
  mailCtrl,
  DBInit,
};
