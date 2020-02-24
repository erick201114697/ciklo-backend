const CONSTANTS = require('../constants/index');
const HttpStatus = require('http-status-codes');

/**
 * Valida el resultado de cada preHandler y retorna donde no sea satisfactorio
 * @param {Pre acceso} preAPIAccessRes
 * @param {Pre servicio redis} preExistServiceRes
 * @param {Pre token} preValidateServiceRes
 * @param {Pre Cifrado} preXssPresentRes
 */
module.exports.preHandlerValidationRes = (
  preAPIAccessRes,
  preExistServiceRes,
  preValidateServiceRes,
  preXssPresentRes,
) => {
  // Validar el resultado del prehandler1 apikey
  if (preAPIAccessRes.statusCode !== HttpStatus.OK) {
    return preAPIAccessRes;
  }
  // Validar el resultado del prehandler2 redis
  if (preExistServiceRes.statusCode !== HttpStatus.OK) {
    return preExistServiceRes;
  }
  // Validar el resultado del prehandler3 jwt
  if (preValidateServiceRes.statusCode !== HttpStatus.OK) {
    return preValidateServiceRes;
  }
  // Validar el resultado del prehandler4 xss
  if (preXssPresentRes.statusCode !== HttpStatus.OK) {
    return preXssPresentRes;
  }
  return CONSTANTS.H_ST_OK(HttpStatus.OK, null, null);
};
