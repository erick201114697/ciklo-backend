const Http = require('http-status-codes');
const CONS = require('../constants/index');

module.exports.getMsj = (request, code, key) => request.i18n.t(`${code}_${key}`);

/**
 * flag=error, info, debug
 * method=login
 * data=error, data to log
 * where=part of the code
 */
module.exports.logCatch = (request, flag, method, error) => {
  request.server.log(
    [
      flag,
      method,
      'Catch',
      request.headers[process.env.TERMINAL],
    ],
    error,
  );

  // TODO: Validar error.errors para cuando los datos
  // Validador de respuesta
  if (!error.code) {
    error.code = 0;
  }
  const httpCode = Http.INTERNAL_SERVER_ERROR;
  return CONS.H_ST_ERR(httpCode, module.exports.getMsj(request, 'mongo', error.code), true);
};
