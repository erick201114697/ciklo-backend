/* eslint-disable global-require */
const Pkg = require('../package.json');
const normalizedPath = require('path').join(__dirname, '/definitions');
const Fs = require('fs');

/**
 * Plugin para adicionar las rutas del componente
 */
exports.plugin = {
  pkg: Pkg,
  register: async (server) => {
    let allDefinitions = [];
    Fs.readdirSync(normalizedPath).forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require
      const route = require(`${normalizedPath}/${file}`);
      const aux = allDefinitions;
      allDefinitions = [...aux, ...route];
    });
    server.route(allDefinitions);
  },
};
