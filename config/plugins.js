const Good = require('good');
const Vision = require('vision');
const Inert = require('inert');
const HapiI18n = require('hapi-i18n');
const HapiJWT = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');
const pluginConf = require('./pluginConf');
const register = require('hapijs-status-monitor');

const plugin = [
  {
    plugin: register,
    options: {
      title: 'My Status Monitor',
      routeConfig: {
        auth: false,
      },
    },
  },
  { plugin: Vision },
  { plugin: Inert },
  {
    plugin: HapiI18n,
    options: pluginConf.i18n,
  },
  { plugin: HapiJWT },
  {
    plugin: HapiSwagger,
    options: pluginConf.swagger,
  },

];

if (!process.env.CI) {
  plugin.push({
    plugin: Good,
    options: pluginConf.goodConf,
  });
}

module.exports = plugin;
