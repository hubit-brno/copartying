import validate from 'validate.js';
import jsonParams from '../../jsonParams.js';
import config from 'config';
import crypto from 'crypto';

var adminCopartyParams = {
  id: {},
  name: {
    presence: true
  },
  date: {
    presence: true,
    isoDate: true
  },
  place: {
    presence: true
  },
  createdAt: {
    isoDate: true
  },
  items: {
    array: true
  },
  guests: {
    array: true
  },
  adminHash: {
    presence: true
  }
};

var guestCopartyParams = {
  id: {},
  name: {
    presence: true
  },
  date: {
    presence: true,
    isoDate: true
  },
  place: {
    presence: true
  },
  createdAt: {
    isoDate: true
  },
  items: {
    array: true
  },
  guests: {
    array: true
  }
};

function generateSecurityStrings(obj, securityString) {
  var currentDate = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  return crypto.createHash('sha1', securityString)
    .update(obj + currentDate + random).digest('hex');
}

function Coparty(data, isAdmin = false) {
  if (data === undefined) {
    throw new Error('Coparty can\'t be undefined!');
  }

  let copartyParams = isAdmin ? adminCopartyParams : guestCopartyParams;

  this.data = jsonParams(data).only(Object.keys(copartyParams));
  this.errors = [];

  if (!Array.isArray(this.data.guests)) {
    this.data.guests = [];
  }

  if (isAdmin) {
    if (!this.data.adminHash) {
      this.data.adminHash = generateSecurityStrings(
        JSON.stringify(this.data.toJson),
        config.get('securityString')
      );
    }
  }

  this.validateCoparty = function validateCoparty() {
    this.errors = validate(this.data, copartyParams);
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

export default Coparty;
