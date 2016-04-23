
/*
	@validator: "Number"
	@supportedOptions:
		min: int
		max: int
		value: int 


		
	@supportedOperators:
		round:  precision
		floor:  precision
		ceil:  precision
		minOp: int
		maxOp: int
 */
module.exports = function(params) {
  var callback, item, options, path, precisionFactor;
  options = params.options, callback = params.callback, item = params.item, path = params.path;
  if (!isNaN(item)) {
    if (options.round != null) {
      precisionFactor = Math.pow(10, options.round);
      item = Math.round(item * precisionFactor) / precisionFactor;
    }
    if (options.floor != null) {
      precisionFactor = Math.pow(10, options.round);
      item = Math.floor(item * precisionFactor) / precisionFactor;
    }
    if (options.ceil != null) {
      precisionFactor = Math.pow(10, options.round);
      item = Math.ceil(item * precisionFactor) / precisionFactor;
    }
    if (options.minOp != null) {
      item = Math.min(item, options.minOp);
    }
    if (options.maxOp != null) {
      item = Math.min(item, options.maxOp);
    }
    if (options.min != null) {
      if (item < options.min) {
        callback({
          error: "tooSmall",
          path: path,
          min: options.min
        }, null);
        return;
      }
    }
    if (options.max != null) {
      if (item > options.max) {
        callback({
          error: "tooBig",
          path: path,
          max: options.max
        }, null);
        return;
      }
    }
    if (options.value != null) {
      if (item !== options.value) {
        callback({
          error: "valueMismatch",
          path: path,
          value: options.value
        });
        return;
      }
    }
    return callback(null, item);
  } else {
    return callback({
      error: "notNumber",
      path: path
    }, null);
  }
};
