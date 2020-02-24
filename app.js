require('dotenv')
  .config();

const Hapi = require('hapi');
const Fs = require('fs');
const Moment = require('moment');
const Handlebars = require('handlebars');
const SocketIO = require('socket.io');

const { db } = require('./config/db').db;
const pluginConf = require('./config/pluginConf');
const plugins = require('./config/plugins');
const RoutesPluging = require('./routes/index');
const utils = require('./lib/utils');

const { serverConf } = pluginConf;

// Creación de ssl si existiera ruta del certificado
if (
  Fs.existsSync(process.env.SSL_PATH) &&
  Fs.existsSync(process.env.SSL_KEY) &&
  Fs.existsSync(process.env.SSL_CA)
) {
  console.log('Servidor Https configurado');
  serverConf.tls = {
    // pfx: Fs.readFileSync(process.env.SSL_PATH),
    // passphrase: process.env.PASSPHRASE,
    cert: Fs.readFileSync(process.env.SSL_PATH),
    key: Fs.readFileSync(process.env.SSL_KEY),
    ca: Fs.readFileSync(process.env.SSL_CA),
  };
}

// Creación del servidor
const server = Hapi.server(serverConf);

/**
 * Server CORS
 */

  server.ext('onPreResponse', (request, h) => {
    if (request.response != null && request.response.header != null) {
      /* Push sender, si el pre indica que hay que enviar una push en la respuesta */
      request.response.header('Access-Control-Allow-Origin', '*');
      request.response.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Accept,terminal,token,lang,idusuario,Authorization',
      );
      // Se retorna iv y refresh al cliente
      const strRaw = `${request.headers[process.env.RAWIV]}`;
      const jwtSign = `${request.headers[process.env.WTJ]}`;
      request.response.header(process.env.RAWIV, Buffer.from(strRaw)
        .toString('base64'));
      request.response.header(process.env.WTJ, jwtSign);
      request.response.header(
        'Access-Control-Expose-Headers',
        `${process.env.RAWIV}, ${process.env.WTJ}`,
      );
      request.response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }


    // Se obtiene data antes de enviar
    const preResponseData = request.response.source ? request.response.source : {};
    if (
      typeof preResponseData.statusCode !== 'undefined' &&
      typeof preResponseData.message !== 'undefined'
    ) {
      // server.log(['debug'], preResponseData);
      request.response.source = preResponseData;
    }
    return h.continue;
  });

  /**
   * Registro de plugins
   * Registro de rutas
   * Inicio de servidor
   */
  const init = async () => {
    try {
      // Registro de plugins
      await server.register(plugins);
      // Auth strategy configuration
      await server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWTGATE, // Never Share your secret key
        validate: utils.jwtAdmin.validateUsrJWT, // validate function defined above
        verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
      });

      server.auth.default('jwt');

      // Registro de rutas
      await server.register(RoutesPluging);

      server.log(['info'], '****Registro de plugins****', Date.now());
      // Configuración de vistas html
      server.views({
        engines: {
          html: Handlebars,
        },
        path: `${__dirname}/views`,
        layout: 'layout',
      });

      // Inicio de servidor
      await server.start();
      server.log(['info'], `Server running at: ${server.info.uri}`, Date.now()
        .toString());
      utils.DBInit.createAdmin();
      utils.DBInit.createAdmin2();
    } catch (err) {
      server.log(['error'], err, Date.now()
        .toString());
      throw new Error(err);
    }
  };

  /**
   * Manejo de eventos
   */

  process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
  });

  server.events.on('log', (request) => {
    const fecha = Moment()
      .format('DD-MM-YYYY HH:mm:ss');
    request.timestamp = fecha;
  });

  init();

  module.exports = server;
