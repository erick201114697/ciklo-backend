const logConf = require('./logConfigs');
const Pack = require('../package');
const Path = require('path');

module.exports.goodConf = {
  reporters: {
    console: logConf.console,
    fileInfo: [
      logConf.squeezeSqueeze('info'),
      logConf.squeezeSafeJson,
      logConf.rotFileStream(process.env.LOGNAME_INFO, process.env.LOGPATH_INFO),
    ],
    fileError: [
      logConf.squeezeSqueeze('error'),
      logConf.squeezeSafeJson,
      logConf.rotFileStream(process.env.LOGNAME_ERROR, process.env.LOGPATH_ERROR),
    ],
    fileDebug: [
      logConf.squeezeSqueeze('debug'),
      logConf.squeezeSafeJson,
      logConf.rotFileStream(process.env.LOGNAME_DEBUG, process.env.LOGPATH_DEBUG),
    ],
  },
};

module.exports.swagger = {
  info: {
    title: 'WM TEMPLATE HAPI JS',
    version: Pack.version,
  },
};

module.exports.i18n = {
  locales: ['es', 'en'],
  directory: `${__dirname}/locales`,
  languageHeaderField: process.env.HEADLANG || 'lang',
  api: {
    __: 't',
    __n: 'tn',
  },
};

module.exports.serverConf = {
  port: process.env[`PORT_${process.env.NODE_ENV.toUpperCase()}`] || 9000,
  host: '0.0.0.0',
  routes: {
    cors: true,
  },
};
