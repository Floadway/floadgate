"use strict";
var _ = require("lodash");
var Utils = require("../utils");
var AsyncGroup_1 = require("../AsyncGroup");
var SchemaStore_1 = require("../SchemaStore");
function Arr(options) {
    var decorator = function (c, name) {
        options = Utils.makeDefault(options, {
            maxLength: null,
            minLength: null,
            length: null,
            group: null
        });
        SchemaStore_1.default.addConstraint(c, name, {
            validate: function (item, callback, path) {
                var constructor = c.constructor;
                if (!_.isArray(item)) {
                    return callback({
                        errorCode: "notArray",
                        description: "Variable is not an array!",
                        path: path + "." + constructor.name + "." + name
                    });
                }
                var group = new AsyncGroup_1.AsyncGroup(function (err, res) {
                    callback(err, res);
                });
                var _loop_1 = function(child) {
                    group.add(function (done) {
                        if (options.child["validate"] != null) {
                            options.child["validate"](child, done, path + "." + c.constructor["name"] + "." + name);
                        }
                        else if (child instanceof options.child) {
                            SchemaStore_1.default.validate(child, done, options.group, path + "." + name);
                        }
                        else {
                            callback({
                                errorCode: "invalidChild",
                                description: "The value passed as child was not valid!",
                                path: path + "." + name
                            }, null);
                        }
                    });
                };
                for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
                    var child = item_1[_i];
                    _loop_1(child);
                }
                group.run();
            },
            options: options,
            type: Array
        });
    };
    decorator["isValidator"] = true;
    return decorator;
}
exports.Arr = Arr;
//# sourceMappingURL=Arr.js.map