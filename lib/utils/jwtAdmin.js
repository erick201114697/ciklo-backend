const jwt = require('jsonwebtoken');
const CONS = require('../constants/index');
const HttpStatus = require('http-status-codes');
const Message = require('./message');
const Model = require('../models/models-mongo');

/**
 * Crea un JWT con la información enviada en el payload
 * @param {*} payload
 */
module.exports.jwtSign = (request, payload, expTime) => {
  const httpCode = HttpStatus.FORBIDDEN;
  const message = Message.getMsj(request, httpCode, 1);
  try {
    // TODO: Cifrar payload del JWT
    const token = jwt.sign({ data: payload }, process.env.JWTGATE, {
      algorithm: CONS.JWTCIPHERS[process.env.JWTCIPHERS],
      expiresIn: expTime || process.env.EXPTIME,
    });
    return CONS.H_ST_OK(HttpStatus.OK, null, token);
  } catch (error) {
    const terminal = request.headers[process.env.TERMINAL];
    request.server.log(['error', 'jwtSign', 'CATCH', terminal], error);
    return CONS.H_ST_ERR(httpCode, message, true);
  }
};

/** *
 *  Finds user in mongo to check if the token is correct
 * TODO: eliminate double find for user in activate and restore user
 */
module.exports.validateUsrJWT = async (decoded, request) => {
  try {
    const options = {
      mail: decoded.data.mail,
      surnames: decoded.data.surnames,
      names: decoded.data.names,
      sessionUserToken: request.headers.authorization.split(' ')[1],
    };

    const userFound = await Model.User.findOne(options);

    if (!userFound) {
      const terminal = request.headers[process.env.TERMINAL];
      request.server.log(['error', 'validateUsrJWT', 'TRY', terminal], 'Not found user');
      return { isValid: false };
    }
    // User softInfo to manipulates in other handlers
    request.params.softInfo = JSON.stringify(decoded.data);

    return {
      isValid: true,
      credentials: {
        scope: userFound.scope,
      },
    };
  } catch (error) {
    const terminal = request.headers[process.env.TERMINAL];
    request.server.log(['error', 'validateUsrJWT', 'CATCH', terminal], error);
    return { isValid: false };
  }
};

/**
 * Valida la integridad del token envíado por el cliente
 * @param {*} headers
 */
module.exports.jwtVerify = (request, jwtVal) => {
  let httpCode = HttpStatus.UNAUTHORIZED;
  let message = Message.getMsj(request, httpCode, 1);
  try {
    // Si no existe un token entonces retornar mensaje de autenticación requerida
    if (!jwtVal) {
      httpCode = HttpStatus.PROXY_AUTHENTICATION_REQUIRED;
      message = Message.getMsj(request, httpCode, 1);
      return CONS.H_ST_ERR(httpCode, message, true);
    }
    const { data } = jwt.verify(jwtVal, process.env.JWTGATE, {
      algorithms: [CONS.JWTCIPHERS[process.env.JWTCIPHERS]],
    });
    // TODO: Descrifar el contenido del payload del JWT
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  } catch (error) {
    const terminal = request.headers[process.env.TERMINAL];
    request.server.log(['error', 'jwtVerify', 'CATCH', terminal], error);
    return CONS.H_ST_ERR(httpCode, message, true);
  }
};
