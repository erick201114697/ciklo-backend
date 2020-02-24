const handlers = require('../../lib/handlers');
const Joi = require('joi');
const pkg = require('../../package.json');

module.exports = [
  {
    method: 'POST',
    path: '/piloto',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Piloto.register.handler,
      notes: 'Login with credentials for the Admin, Tutors and Users',
      validate: {
        payload: {
          nombre: Joi.string()
            .required(),
          edad: Joi.number()
            .required(),
          dpi: Joi.string()
            .required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/piloto/{id}',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Piloto.find.handler,
      notes: 'Get user by email',
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('email of user'),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/piloto',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Piloto.findAll.handler,
      notes: 'Get user by email',
    },
  },

  {
    method: 'POST',
    path: '/asignacion',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Asignacion.register.handler,
      notes: 'Login with credentials for the Admin, Tutors and Users',
      validate: {
        payload: {
          direccionOrigen: Joi.string().required(),
          direccionDestino: Joi.string().required(),
          piloto: Joi.object().required(),
          camion: Joi.object().required(),
          paquete: Joi.object().required(),
          usuario: Joi.object().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/asignacion/{id}',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Asignacion.find.handler,
      notes: 'Get user by email',
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('email of user'),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/asignacion',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Asignacion.findAll.handler,
      notes: 'Get user by email',
    },
  },
  {
    method: 'DELETE',
    path: '/asignacion/{id}',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Asignacion.remove.handler,
      notes: 'Get user by email',
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('email of user'),
        },
      },
    },
  },

  {
    method: 'POST',
    path: '/camion',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Camion.register.handler,
      notes: 'Login with credentials for the Admin, Tutors and Users',
      validate: {
        payload: {
          modelo: Joi.string()
            .required(),
          placa: Joi.string()
            .required(),
          tipo: Joi.string()
            .required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/camion/{id}',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Camion.find.handler,
      notes: 'Get user by email',
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('email of user'),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/camion',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Camion.findAll.handler,
      notes: 'Get user by email',
    },
  },

  {
    method: 'POST',
    path: '/paquete',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Paquete.register.handler,
      notes: 'Login with credentials for the Admin, Tutors and Users',
      validate: {
        payload: {
          nombre: Joi.string()
            .required(),
          descripcion: Joi.string()
            .required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/paquete/{id}',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Paquete.find.handler,
      notes: 'Get user by email',
      validate: {
        params: {
          id: Joi.string()
            .required()
            .description('email of user'),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/paquete',
    config: {
      tags: ['api'],
      auth: false,
      handler: handlers.Paquete.findAll.handler,
      notes: 'Get user by email',
    },
  },

];
