function JsonParams(data) {
  let self = {};
  if (data === undefined) {
    throw new Error('Object can\'t be undefined');
  }
  var data = JSON.parse(JSON.stringify(data));

  if (!(this instanceof JsonParams)) {
    return new JsonParams(arguments[0]);
  }

  self.clone = function clone() {
    return copy(data);
  };

  self.only = function only(params) {
    var newObject = {};
    var i;
    for (i = 0; i < params.length; i++) {
      newObject[params[i]] = copy(data[params[i]]);
    }
    return newObject;
  };

  function copy(data) {
    if (data === undefined) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(data));
  }

  return self;
}

module.exports = JsonParams;
