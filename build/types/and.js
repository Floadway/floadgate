
/*
	@validator "and"
 */
module.exports = function(params) {
  var callback, currIndex, item, options, path, validate, validateStep;
  options = params.options, callback = params.callback, item = params.item, path = params.path, validate = params.validate;
  currIndex = 0;
  validateStep = function(currItem) {
    return validate(currItem, options.children[currIndex], path + ("[cond:" + currIndex + "]"), function(err, validatedItem) {
      console.log(err, validatedItem);
      if (err != null) {
        return callback(err, null);
      } else {
        currIndex += 1;
        if (currIndex === options.children.length) {
          return callback(null, validatedItem);
        } else {
          return validateStep(validatedItem);
        }
      }
    });
  };
  return validateStep(item);
};
