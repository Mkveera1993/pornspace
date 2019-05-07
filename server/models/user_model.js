'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String
  },
  passwordHash: {
    type: String
  },  
  salt: {
    type: String
  },
  role:{
    type: Number
  },
  mobile:{
    type:Number
  },
  email:{
    type:String
  },
  age:{
    type:Number
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */




UserSchema
  .virtual('userRole')
  .get(function () {
    if (this.role === 1) {
      return 'Admin';
    }
    if (this.role === 2) {
      return 'Visitor';
    }
    

  });






/**
 * Methods
 */
UserSchema.methods = {

  /**
   * Authenticate
   *
   * @param {String} password
   * @return {Boolean}
   */
  authenticate: function (password) {
    return this.encryptPassword(password) === this.passwordHash;
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
}

module.exports = mongoose.model('User', UserSchema);
