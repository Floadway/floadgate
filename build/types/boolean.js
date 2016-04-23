module.exports = function(params) {
  var callback, item, options, path;
  options = params.options, callback = params.callback, item = params.item, path = params.path;
  item = item === "true" || item === true;
  if ((options.inverse != null) && options.inverse) {
    item = !item;
  }
  return callback(null, item);
};
