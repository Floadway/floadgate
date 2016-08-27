"use strict";
var SchemaStore_1 = require("../SchemaStore");
var _ = require("lodash");
var Utils = require("../utils");
function Nr(options) {
    if (options == null) {
        options = {};
    }
    options = Utils.makeDefault(options, {
        min: null,
        max: null,
        floor: null,
        ceil: null,
        round: null,
        allowDecimals: true
    });
    var validate = function (item, callback, path) {
        if (!_.isNumber(item)) {
            return callback({
                errorCode: "notNumber",
                description: "Variable is not a numer!",
                path: path
            }, null);
        }
        if (options.ceil != null) {
            var factor = Math.pow(10, options.ceil);
            item = Math.ceil(item * factor) / factor;
        }
        if (options.floor != null) {
            var factor = Math.pow(10, options.floor);
            item = Math.floor(item * factor) / factor;
        }
        if (options.round != null) {
            var factor = Math.pow(10, options.round);
            item = Math.round(item * factor) / factor;
        }
        if (options.min != null && item < options.min) {
            return callback({
                errorCode: "tooSmall",
                description: "Number passed was too small Min: " + options.min,
                path: path
            }, null);
        }
        if (options.max != null && item > options.max) {
            return callback({
                errorCode: "tooBig",
                description: "Number passed was too big Max: " + options.max,
                path: path
            }, null);
        }
        if (!options.allowDecimals && item % 1 != 0) {
            return callback({
                errorCode: "decimalsNotAllowed",
                description: "The number passed has decimal  places ",
                path: path
            }, null);
        }
        callback(null, item);
    };
    var decorator = function (c, name) {
        SchemaStore_1.default.addConstraint(c, name, {
            validate: function (item, callback, path) {
                validate(item, callback, path + "." + c.constructor.name + "." + name);
            },
            options: options
        });
    };
    decorator["validate"] = validate;
    return decorator;
}
exports.Nr = Nr;
//# sourceMappingURL=Nr.js.map