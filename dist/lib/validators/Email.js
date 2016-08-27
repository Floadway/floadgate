"use strict";
var SchemaStore_1 = require("../SchemaStore");
var _ = require("lodash");
var Utils = require("../utils");
var validator = require("validator");
function Email(options) {
    if (options == null) {
        options = {};
    }
    options = Utils.makeDefault(options, {});
    var validate = function (item, callback, path) {
        if (!_.isString(item)) {
            return callback({
                errorCode: "notString",
                description: "Variable is not a string!",
                path: path
            });
        }
        if (validator.isEmail(item)) {
            callback(null, item);
        }
        else {
            callback({
                errorCode: "notEmail",
                description: "The value provided is not a valid email address",
                path: path
            });
        }
    };
    var decorator = function (c, name) {
        SchemaStore_1.default.addConstraint(c, name, {
            validate: function (item, callback, path) {
                validate(item, callback, path + "." + c.constructor.name + "." + name);
            },
            type: String,
            options: options
        });
    };
    decorator["validate"] = validate;
    decorator["type"] = String;
    return decorator;
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map