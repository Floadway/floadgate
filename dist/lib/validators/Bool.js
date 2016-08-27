"use strict";
var SchemaStore_1 = require("../SchemaStore");
var _ = require("lodash");
var Utils = require("../utils");
function Bool(options) {
    if (options == null) {
        options = {};
    }
    options = Utils.makeDefault(options, {});
    var validate = function (item, callback, path) {
        if (!_.isBoolean(item)) {
            return callback({
                errorCode: "notBoolean",
                description: "Variable is not a boolean!",
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
            options: options
        });
    };
    decorator["validate"] = validate;
    return decorator;
}
exports.Bool = Bool;
//# sourceMappingURL=Bool.js.map