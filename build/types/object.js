var processObject;

processObject = require("./utils").processObject;

module.exports = function(params) {
  var callback, doValidation, failed, item, key, options, path, ref, shortenedObject, validate, value;
  options = params.options, callback = params.callback, item = params.item, path = params.path, validate = params.validate;
  doValidation = function(validateItem, children, useKeys, callback) {
    var error;
    error = null;
    return processObject(validateItem, function(key, value, done) {
      var childOptions;
      childOptions = useKeys ? children[key] : children;
      return validate(value, childOptions, path + "." + key, function(err, validatedItem) {
        if (err != null) {
          error = err;
        }
        return done(validatedItem);
      });
    }, function(finalObject) {
      if (error != null) {
        return callback(error, null);
      } else {
        return callback(null, finalObject);
      }
    });
  };
  switch (options.mode) {
    case "loose":
      return doValidation(item, options.children, options.keys === true, callback);
    case "shorten":
      shortenedObject = {};
      failed = false;
      ref = options.children;
      for (key in ref) {
        value = ref[key];
        if (item[key] != null) {
          shortenedObject[key] = item[key];
        } else {
          if (value.optional) {
            if (value["default"] != null) {
              shortenedObject[key] = value["default"];
            } else {
              shortenedObject[key] = null;
            }
          } else {
            callback({
              error: "missingProp",
              path: path + "." + key
            });
            failed = true;
            break;
          }
        }
      }
      if (failed) {
        return;
      } else {
        doValidation(shortenedObject, options.children, options.keys === true, callback);
      }
      break;
    default:
      return callback({
        error: "invalidMode",
        path: path
      });
  }
};
