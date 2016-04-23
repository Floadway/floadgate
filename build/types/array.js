var processArray;

processArray = require("./utils").processArray;

module.exports = function(params) {
  var callback, error, item, onFinish, options, path, validate;
  options = params.options, callback = params.callback, item = params.item, path = params.path, validate = params.validate;
  error = null;
  onFinish = function(validatedArray) {
    if (error != null) {
      return callback(error, null);
    } else {
      return callback(null, validatedArray);
    }
  };
  switch (options.mode) {
    case "unique":
      if (item.length <= options.children.length) {
        return processArray(item, function(item, index, done) {
          var newPath;
          newPath = path + "[" + index + "]";
          return validate(item, options.children[index], newPath, function(err, validatedItem) {
            if (err != null) {
              error = err;
            }
            return done(validatedItem);
          });
        }, onFinish);
      } else {
        return callback({
          error: "tooManyChildren",
          path: path
        }, null);
      }
      break;
    case "uniform":
      return processArray(item, function(item, index, done) {
        var newPath;
        newPath = path + "[" + index + "]";
        return validate(item, options.children, newPath, function(err, validatedItem) {
          if (err != null) {
            error = err;
          }
          return done(validatedItem);
        });
      }, onFinish);
    default:
      return callback({
        error: "unknownMode",
        path: path
      }, null);
  }
};
