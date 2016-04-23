var processArray;

processArray = require("./utils").processArray;

module.exports = function(params) {
  var callback, item, options, path, validate;
  options = params.options, callback = params.callback, item = params.item, path = params.path, validate = params.validate;
  if (item === options.value) {
    return callback(null, item);
  } else {
    return callback({
      error: "valueMismatch",
      path: path
    }, null);
  }
};
