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
      const isTutor = request.url.path === '/api/tutor';
      const userInfo = request.payload;
      userInfo.avatar = process.env.AVATAR_PATH;
      userInfo.created_date = Date.now();
      userInfo.status = 'INACTIVATED';
      userInfo.level = 1;
      userInfo.scope = isTutor ? 'tutor' : 'user';
      const newUser = new Model.User(request.payload);

      // If the user was created, returns ok to client
      const softInfoUser = newUser.jwtInfo();

      // Create JWT and send activation link to email user
      const activateJWT = utils.jwtAdmin.jwtSign(
        request,
        softInfoUser,
        `${process.env.ACTIVATE_EXP_TIME}`,
      );

      // If token isn't ok, send error to client
      if (activateJWT.statusCode !== Http.OK) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      newUser.activateUserToken = activateJWT.data;

      const newUserRes = await newUser.save();

      if (!newUserRes) {
        message = utils.message.getMsj(request, httpCode, 2);
        sendClient = CONS.H_ST_ERR(httpCode, message, true);
        return h.response(sendClient).code(sendClient.statusCode);
      }

      httpCode = Http.CREATED;
      // Sending activation email
      utils.mailCtrl.sendActivateLink(activateJWT.data, softInfoUser.mail);

      message = utils.message.getMsj(request, httpCode, 1);
      sendClient = CONS.H_ST_OK(httpCode, message, softInfoUser);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'register', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};

module.exports.updateClient = {
  handler: async (request, h) => {
    let httpCode = Http.BAD_REQUEST;
    let message = utils.message.getMsj(request, httpCode, 13);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////

      let updateUser = await Model.User.findOneAndUpdate(
        {
          mail: request.params.id,
        },
        {
          names: request.payload.names,
          surnames: request.payload.surnames,
          birthdate: request.payload.birthdate,
          sex: request.payload.sex,
          phone: request.payload.phone,
          country: request.payload.country,
        },
        { runValidators: true },
      );

      if (!updateUser) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      // If the user was created, returns ok to client
      updateUser = updateUser.jwtInfo();
      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 1);
      sendClient = CONS.H_ST_OK(httpCode, message, updateUser);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'updateUser', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};

module.exports.updateUser = {
  handler: async (request, h) => {
    let httpCode = Http.BAD_REQUEST;
    let message = utils.message.getMsj(request, httpCode, 3);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////

      let updateUser = await Model.User.findOneAndUpdate(
        {
          mail: request.params.id,
        },
        request.payload,
        { runValidators: true },
      );

      if (!updateUser) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      // If the user was created, returns ok to client
      updateUser = updateUser.jwtInfo();
      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 1);
      sendClient = CONS.H_ST_OK(httpCode, message, updateUser);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'updateUser', error);
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

      let user = await Model.User.findById(request.params.id);

      if (!user) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      // If the user was created, returns ok to client
      const scope = request.auth.credentials.scope;

      if (scope.find(role => role !== 'admin')) {
        user = user.jwtInfo();
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
      const isUsers = request.url.path === '/api/users';
      const { scope } = request.auth.credentials;
      const options = {
        scope: isUsers ? ['user'] : ['tutor'],
      };
      let users = await Model.User.find(options);

      if (!users) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      // If the user was created, returns ok to client

      if (scope.find(role => role !== 'admin')) {
        users = users.map((T) => {
          T.password = undefined;
          T.status = undefined;
          T.created_date = undefined;
          T.active_hash = undefined;
          T.resetPasswordToken = undefined;
          T.activateUserToken = undefined;
          return T;
        });
      }
      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 15);
      sendClient = CONS.H_ST_OK(httpCode, message, users);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'findAll', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};

module.exports.delete = {
  handler: async (request, h) => {
    let httpCode = Http.NOT_FOUND;
    let message = utils.message.getMsj(request, httpCode, 14);
    let sendClient = CONS.H_ST_ERR(httpCode, message, true);
    try {
      // /////////////////////////////////////////////////////////////////
      const users = await Model.User.deleteOne({ _id: request.params.id });

      if (!users) {
        return h.response(sendClient).code(sendClient.statusCode);
      }

      // If the user was created, returns ok to client
      httpCode = Http.OK;

      message = utils.message.getMsj(request, httpCode, 15);
      sendClient = CONS.H_ST_OK(httpCode, message, users);

      return h.response(sendClient).code(sendClient.statusCode);
      // /////////////////////////////////////////////////////////////////
    } catch (error) {
      const errorResponse = utils.message.logCatch(request, 'error', 'findAll', error);
      return h.response(errorResponse).code(errorResponse.statusCode);
    }
  },
};
