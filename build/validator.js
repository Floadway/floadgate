
/* 
	FLOADGATE CORE FILE
 */
var Validator, validator,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Validator = (function() {
  function Validator() {
    this.validateItem = bind(this.validateItem, this);
    this.validate = bind(this.validate, this);
    this.validators = {};
  }

  Validator.prototype.registerType = function(name, validationFunction) {
    if (this.validators[name] == null) {
      return this.validators[name] = validationFunction;
    } else {
      throw new Exception("A validator with the name " + name + " is already defined.");
    }
  };

  Validator.prototype.validate = function(item, options, callback) {
    return this.validateItem(item, options, "root", callback);
  };

  Validator.prototype.validateItem = function(item, options, path, callback) {
    if (this.validators[options.type] != null) {
      return this.validators[options.type]({
        item: item,
        options: options,
        path: path,
        callback: callback,
        validate: this.validateItem
      });
    } else {
      return callback({
        error: "unknownType",
        path: path,
        type: options.type
      }, null);
    }
  };

  return Validator;

})();

validator = new Validator();

validator.registerType("and", require("./types/and"));

validator.registerType("array", require("./types/array"));

validator.registerType("boolean", require("./types/boolean"));

validator.registerType("number", require("./types/number"));

validator.registerType("is", require("./types/is"));

validator.registerType("object", require("./types/object"));

validator.registerType("or", require("./types/or"));

validator.registerType("string", require("./types/string"));

validator.registerType("utils", require("./types/utils"));

module.exports = validator;
