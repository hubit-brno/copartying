import validate from 'validate.js';
import jsonParams from '../../jsonParams.js';
import config from 'config';
import crypto from 'crypto';

var guestParams = {
  name: {
    presence: true
  },
  email: {
    presence: true
  },
  createdAt: {
    isoDate: true
  },
  items: {
    array: true
  }
};

function Guest(data) {
  if (data === undefined) {
    throw new Error('Guest can\'t be undefined!');
  }

  this.data = jsonParams(data).only(Object.keys(guestParams));
  this.errors = [];

  this.validateGuest = function validateGuest() {
    this.errors = validate(this.data, guestParams);
    return !this.errors;
  };

  this.toJson = function toJson() {
    return JSON.parse(JSON.stringify(this.data));
  };

  this.getErrors = function getErrors() {
    return JSON.parse(JSON.stringify(this.errors));
  };

  this.set = function set(key, value) {
    this.data[key] = value;
  };

  this.get = function get(key) {
    return this.data[key];
  };

  return this;
}

export default Guest;
