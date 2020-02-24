const handlers = require('../../lib/handlers');
const Joi = require('joi');
const pkg = require('../../package.json');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, h) => ({
        statusCode: 200,
        message: 'Walmart Template API',
        data: { 'API HapiJs Walmart CAM,  Version': pkg.version },
      }),
    },
  },
  {
    method: 'GET',
    path: '/images/{img*}',
    config: {
      tags: ['images'],
      auth: false,
      handler: {
        directory: { path: 'public/images' },
      },
    },
  },
  {
    method: 'GET',
    path: '/stylesheet/{css*}',
    config: {
      tags: ['css'],
      auth: false,
      handler: {
        directory: { path: 'public/css' },
      },
    },
  },
  {
    method: 'GET',
    path: '/js/{js*}',
    config: {
      tags: ['js'],
      auth: false,
      handler: {
        directory: { path: 'public/js' },
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Auth.login.handler,
      notes: 'Login with credentials for the Admin, Tutors and Users',
      validate: {
        payload: {
          user: Joi.string()
            .required(),
          mt1: Joi.string()
            .required(),
        },
      },
    },
  },
];
