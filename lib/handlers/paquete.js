const Http = require('http-status-codes');
const CONS = require('../constants');
const utils = require('../utils');
const Model = require('../models/models-mongo');

module.exports.register = {
  handler: async (request, h) => {
    let httpCode = Http.BAD_REQUEST;
    let message = utils.message.getMsj(request, httpCode, 4);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////
      const newUser = new Model.Paquete(request.payload);

      const newUserRes = await newUser.save();

      if (!newUserRes) {
        message = utils.message.getMsj(request, httpCode, 2);
        sendClient = CONS.H_ST_ERR(httpCode, message, true);
        return h.response(sendClient).code(sendClient.statusCode);
      }

      httpCode = Http.CREATED;

      message = utils.message.getMsj(request, httpCode, 1);
      sendClient = CONS.H_ST_OK(httpCode, message, newUserRes);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'register', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};

module.exports.find = {
  handler: async (request, h) => {
    let httpCode = Http.NOT_FOUND;
    let message = utils.message.getMsj(request, httpCode, 14);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////

      let user = await Model.Paquete.findById(request.params.id);

      console.log(request.params.id);

      if (!user) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 15);
      sendClient = CONS.H_ST_OK(httpCode, message, user);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'find', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};

module.exports.findAll = {
  handler: async (request, h) => {
    let httpCode = Http.NOT_FOUND;
    let message = utils.message.getMsj(request, httpCode, 14);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////

      let user = await Model.Paquete.find();

      console.log(request.params.id);

      if (!user) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 15);
      sendClient = CONS.H_ST_OK(httpCode, message, user);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'find', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};
