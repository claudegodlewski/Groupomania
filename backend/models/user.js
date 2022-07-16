const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  systemAdministrator: { type: Boolean,required: false},
  systemUser: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);