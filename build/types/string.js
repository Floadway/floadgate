module.exports = function(params) {
  var callback, item, options, path;
  options = params.options, callback = params.callback, item = params.item, path = params.path;
  item = String(item);
  if ((options.trim != null) && options.trim) {
    item = item.trim();
  }
  if ((options.toLowerCase != null) && options.toLowerCase) {
    item = item.toLowerCase();
  }
  if ((options.toUpperCase != null) && options.toUpperCase) {
    item = item.toUpperCase();
  }
  if ((options.replace != null) && (options.replace.pattern != null) && (options.replace.value != null)) {
    item = item.replace(options.replace.pattern, options.replace.value);
  }
  if ((options.minLength != null) && options.minLength > item.length) {
    callback({
      path: path,
      error: "tooShort",
      minLength: options.minLength
    }, null);
    return;
  }
  if ((options.maxLength != null) && options.maxLength < item.length) {
    callback({
      path: path,
      error: "tooLong",
      maxLength: options.maxLength
    }, null);
    return;
  }
  if ((options.exactLength != null) && options.exactLength !== item.length) {
    callback({
      path: path,
      error: "invalidLength",
      exactLength: options.exactLength
    }, null);
    return;
  }
  return callback(null, item);
};
