"use strict";
var SchemaStore_1 = require("../SchemaStore");
var _ = require("lodash");
var Utils = require("../utils");
function Str(options) {
    if (options == null) {
        options = {};
    }
    options = Utils.makeDefault(options, {
        length: null,
        minLength: null,
        maxLength: null,
        toLowerCase: false,
        toUpperCase: false,
        trim: false,
        whitelist: null,
        blacklist: null
    });
    var validate = function (item, callback, path) {
        if (!_.isString(item)) {
            return callback({
                errorCode: "notString",
                description: "Variable is not a string!",
                path: path
            });
        }
        if (options.toLowerCase) {
            item = item.toLowerCase();
        }
        if (options.toUpperCase) {
            item = item.toUpperCase();
        }
        if (options.trim) {
            item = item.trim();
        }
        if (options.whitelist != null && options.whitelist.indexOf(item) == -1) {
            return callback({
                errorCode: "whitelistedValue",
                description: "Only the following strings are allowed " + JSON.stringify(options.whitelist),
                path: path
            });
        }
        if (options.blacklist != null && options.blacklist.indexOf(item) != -1) {
            return callback({
                errorCode: "blacklistedValue",
                description: "The following strings are not allowed " + JSON.stringify(options.blacklist),
                path: path
            });
        }
        if (options.length != null && item.length != options.length) {
            return callback({
                errorCode: "invalidLength",
                description: "Only strings with the length of  " + options.length + " are allowed",
                path: path
            });
        }
        if (options.maxLength != null && item.length > options.maxLength) {
            return callback({
                errorCode: "tooLong",
                description: "Only strings with a max. length of  " + options.maxLength + " are allowed",
                path: path
            });
        }
        if (options.minLength != null && item.length < options.minLength) {
            return callback({
                errorCode: "tooShort",
                description: "Only strings with a min. length of  " + options.maxLength + " are allowed",
                path: path
            });
        }
        callback(null, item);
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
exports.Str = Str;
//# sourceMappingURL=Str.js.map