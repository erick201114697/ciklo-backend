const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  tag: { type: Number, required: true },
  content: [
    {
      number: { type: Number, required: true },
      excercises: [{ type: Number, required: true }],
    },
  ],
});

module.exports = mongoose.model('Level', LevelSchema);
