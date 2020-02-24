const Http = require('http-status-codes');
const CONS = require('../constants');
const utils = require('../utils');
const Model = require('../models/models-mongo');

module.exports.login = {
  handler: async (request, h) => {
    let httpCode = Http.NOT_FOUND;
    let message = utils.message.getMsj(request, httpCode, 1);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      const userFinded = await Model.User.findOne({ mail: request.payload.user })
        .exec();

      if (!userFinded) {
        return h.response(sendClient)
          .code(sendClient.statusCode);
      }

      if (userFinded.status !== 'ACTIVATED') {
        httpCode = Http.PROXY_AUTHENTICATION_REQUIRED;
        message = utils.message.getMsj(request, httpCode, 16);
        sendClient = CONS.H_ST_ERR(httpCode, message, true);
        return h.response(sendClient)
          .code(sendClient.statusCode);
      }

      // Check if the accoutn is currently locked
      // TODO: add message locked
      if (userFinded.isLocked) {
        await userFinded.incLoginAttempts();
        message = utils.message.getMsj(request, httpCode, 26);
        sendClient = CONS.H_ST_ERR(httpCode, message, true);
        return h.response(sendClient)
          .code(sendClient.statusCode);
      }

      const valPass = userFinded.validatePassword(request.payload.mt1);

      if (!valPass) {
        await userFinded.incLoginAttempts();
        return h.response(sendClient)
          .code(sendClient.statusCode);
      }

      if (userFinded.loginAttempts || userFinded.lockUntil) {
        const updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 },
        };
        await userFinded.update(updates);
      }

      // JWT generation
      const jwtPayload = userFinded.jwtInfo();
      const jwtRes = utils.jwtAdmin.jwtSign(request, jwtPayload);


      if (jwtRes.statusCode !== Http.OK) {
        return h.response(jwtRes)
          .code(jwtRes.statusCode);
      }

      // Add JWT to sessionUserToken to assign this JWT
      const updates = {
        $set: { sessionUserToken: jwtRes.data },
      };
      await userFinded.update(updates);

      const res = userFinded.jwtInfo();
      res.token = jwtRes.data;

      httpCode = Http.OK;
      message = utils.message.getMsj(request, httpCode, 2);
      sendClient = CONS.H_ST_OK(httpCode, message, res);

      return h.response(sendClient)
        .code(Http.OK);
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'login', error);
      return h.response(errorResponse)
        .code(errorResponse.statusCode);
    }
  },
};


