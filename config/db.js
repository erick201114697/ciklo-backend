const Mongoose = require('mongoose');

const uri = `mongodb://${process.env.MIP}:${process.env.MPORT}/${process.env.MDBNAME}`;

Mongoose.connect(
  uri,
  { useNewUrlParser: true },

);
Mongoose.set('useFindAndModify', false);
Mongoose.set('useCreateIndex', true);
Mongoose.Promise = global.Promise;
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connection with MongoDB succeeded.');
});

exports.db = db;
