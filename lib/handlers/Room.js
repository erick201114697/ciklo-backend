const mongoose = require('mongoose');
const Moment = require('moment');

// Moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
const formatDigit = (value) => {
  if (value.length === 1) {
    return `0${value}`;
  }
  return value;
};

const RoomSchema = new mongoose.Schema({
  scheduleInit: { type: String, required: true },
  scheduleEnd: { type: String, required: true },
  day: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  level: { type: String, required: true },
  tutor: { type: String, required: true },
  date: { type: Date },
  capacity: { type: Number, default: 10 },
  numberReserve: { type: Number, default: 0 },
  reservations: [{ type: String }],
  status: { type: String, default: 'ACTIVO' },
  availability: { type: String, default: 'LIBRE' },
  asistence: [{ idUser: String }],
  chat: { type: String, default: '' },
});

RoomSchema.pre('save', function preSave(next) {
  this.status = 'ACTIVO';
  this.availability = 'LIBRE';
  // const dateTime = new Date(`${this.year}-${this.month}-${this.day} ${this.scheduleInit}:00:00`);
  this.date = Moment(`${this.year}-${formatDigit(this.month)}-${formatDigit(this.day)} ${formatDigit(this.scheduleInit)}:00:00`).toDate();
  return next();
});

RoomSchema.statics.getData = function getData(payload) {
  const {
    level, tutor, capacity, status, availability,
  } = payload;

  const data = {};

  if (level) {
    data.level = level;
  }
  if (tutor) {
    data.tutor = tutor;
  }
  if (capacity) {
    data.capacity = capacity;
  }
  if (status) {
    data.status = status;
  }
  if (availability) {
    data.availability = availability;
  }
  return data;
};

module.exports = mongoose.model('Room', RoomSchema);
