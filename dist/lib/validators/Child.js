"use strict";
var SchemaStore_1 = require("../SchemaStore");
var Utils = require("../utils");
var SchemaStore_2 = require("../SchemaStore");
function Child(options) {
    var validate = function (item, callback, path) {
        if (item instanceof options.type) {
            SchemaStore_2.default.validate(item, callback, options.group, path);
        }
        else {
            callback({
                errorCode: "invalidChild",
                description: "The child passed was not of the correct type!",
                path: path
            });
        }
    };
    var decorator = function (c, name) {
        options = Utils.makeDefault(options, {});
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
exports.Child = Child;
//# sourceMappingURL=Child.js.map