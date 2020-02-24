const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  enrollment: String,
  names: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  status: String,
  created_date: Date,
  updated_date: Date,
  active_hash: String,
  level: String,
  avatar: String,
  scope: [{
    type: String,
    required: true,
  }],
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: { type: Number },
  resetPasswordToken: String,
  activateUserToken: String,
  sessionUserToken: String,
});

UserSchema.pre('save', function genPassword(next) {
  try {
    return next();
  } catch (error) {
    console.error('pre save:', error);
    return next(error);
  }
});

UserSchema.pre('findOneAndUpdate', function update() {
  this.update({}, { $set: { updated_date: new Date() } });
});

UserSchema.statics.genPassword = function genPassword(password) {
  try {
    return password;
  } catch (error) {
    console.error('genPa:', error);
    return null;
  }
};


UserSchema.methods.validatePassword = function validatePassword(password) {
  try {
    return (password === this.password);
  } catch (error) {
    console.error('validate:', error);
    return false;
  }
};

UserSchema.methods.jwtInfo = function jwtInfo() {
  return {
    id: this.id,
    names: this.names,
    surnames: this.surnames,
    country: this.country,
    mail: this.mail,
    status: this.status,
    level: this.level,
    avatar: this.avatar,
    scope: this.scope,
  };
};

UserSchema.virtual('isLocked')
  .get(function isLocked() {
    // check for a future lockUntil timestamp
    const date = Date.now();
    const isLock = !!(this.lockUntil && this.lockUntil > date);
    return isLock;
  });

UserSchema.methods.incLoginAttempts = function incLoginAttempts(cb) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    }, cb);
  }
  // otherwise we're incrementing
  const updates = { $inc: { loginAttempts: 1 } };
  // lock the account if we've reached max attempts and it's not locked already
  const max = parseInt(process.env.MAX_LOGIN_ATTEMPTS, 0);
  const lock = parseInt(process.env.LOCK_TIME, 0);
  if (this.loginAttempts + 1 >= max && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lock };
  }
  return this.update(updates, cb);
};

module.exports = mongoose.model('User', UserSchema);
