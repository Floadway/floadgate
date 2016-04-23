
/*
	@validator "or"
 */
module.exports = function(params) {
  var callback, currIndex, item, lastError, options, passed, path, validate, validateStep;
  options = params.options, callback = params.callback, item = params.item, path = params.path, validate = params.validate;
  passed = false;
  lastError = null;
  currIndex = 0;
  if (options.children.length === 0) {
    callback(null, item);
  }
  validateStep = function() {
    return validate(item, options.children[currIndex], path + ("[cond:" + currIndex + "]"), function(err, validatedItem) {
      currIndex += 1;
      if (err == null) {
        passed = true;
      } else {
        lastError = err;
      }
      if (currIndex === options.children.length) {
        if (passed) {
          return callback(null, validatedItem);
        } else {
          return callback({
            error: "allOptionsFalse",
            path: path,
            lastError: lastError
          }, null);
        }
      } else {
        return validateStep();
      }
    });
  };
  return validateStep();
};
