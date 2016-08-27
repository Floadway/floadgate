"use strict";
var Utils = require("./Utils");
var SchemaMode_1 = require("./SchemaMode");
var AsyncGroup_1 = require("./AsyncGroup");
var SchemaItem = (function () {
    function SchemaItem(options, constructor) {
        this.options = options;
        this.constraints = {};
        this.schemaConstructor = constructor;
    }
    SchemaItem.prototype.getName = function () {
        return this.schemaConstructor["name"];
    };
    SchemaItem.prototype.getConstructor = function () {
        return this.schemaConstructor;
    };
    SchemaItem.prototype.addConstraint = function (key, constraint) {
        constraint.options = Utils.makeDefault(constraint.options, {
            groups: [],
            optional: false,
            default: null
        });
        if (this.constraints[key] == null) {
            this.constraints[key] = [];
        }
        this.constraints[key].push(constraint);
    };
    SchemaItem.prototype.setOptions = function (options) {
        this.options = options;
    };
    SchemaItem.prototype.getOptions = function () {
        return this.options;
    };
    SchemaItem.prototype.getConstraintsForGroup = function (group) {
        var result = {};
        for (var key in this.constraints) {
            var keyConstraints = [];
            var constraints = this.constraints[key];
            for (var _i = 0, constraints_1 = constraints; _i < constraints_1.length; _i++) {
                var constraint = constraints_1[_i];
                if (constraint.options.groups.length == 0 || constraint.options.groups.indexOf(group) != -1) {
                    keyConstraints.push(constraint);
                }
            }
            if (keyConstraints.length != 0) {
                result[key] = keyConstraints;
            }
        }
        return result;
    };
    SchemaItem.prototype.getSchema = function (group) {
        var constraints = this.getConstraintsForGroup(group);
        var result = {};
        for (var key in constraints) {
            result[key] = constraints[key].map(function (constraint) {
                var finalOptions = {};
                Object.keys(constraint.options).map(function (key) {
                    if (constraint.options[key] instanceof Function) {
                        finalOptions[key] = constraint.options[key]["name"];
                        if (constraint.options[key]["type"] != null) {
                            finalOptions["child"] = constraint.options[key]["type"]["name"];
                        }
                    }
                    else {
                        finalOptions[key] = constraint.options[key];
                    }
                });
                return {
                    type: constraint.type['name'],
                    options: finalOptions
                };
            });
        }
        return {
            name: this.getName(),
            mode: Utils.schemaModeToString(this.getOptions().mode),
            constraints: result
        };
    };
    SchemaItem.prototype.validate = function (item, callback, group, path) {
        var resultItem = this.options.mode == SchemaMode_1.SchemaMode.LOOSE ? item : {};
        var constraints = this.getConstraintsForGroup(group);
        if (this.options.mode == SchemaMode_1.SchemaMode.STRICT) {
            var match = true;
            for (var key in constraints) {
                if (!item.hasOwnProperty(key)) {
                    return callback({
                        errorCode: "missingKey",
                        description: "The key " + key + " was not found!",
                        path: path + "." + key
                    }, null);
                }
            }
            if (Object.keys(item).length > Object.keys(constraints).length) {
                return callback({
                    errorCode: "tooManyKeys",
                    description: "The object passed has too many keys",
                    path: path
                }, null);
            }
        }
        var asyncGroup = new AsyncGroup_1.AsyncGroup(function (err, data) {
            if (err != null) {
                callback(err, null);
            }
            else {
                callback(null, resultItem);
            }
        });
        var _loop_1 = function(key) {
            var items = constraints[key];
            if (!item.hasOwnProperty(key)) {
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var constraintItem = items_1[_i];
                    if (constraintItem.options.optional) {
                        resultItem[key] = constraintItem.options.default;
                    }
                    else {
                        return { value: callback({
                            errorCode: "missingKey",
                            description: "Key " + key + " is missing on the schema",
                            path: path + "." + key
                        }, null) };
                    }
                }
            }
            items.map(function (constraintItem) {
                resultItem[key] = item[key];
                asyncGroup.add(function (done) {
                    constraintItem.validate(resultItem[key], function (err, value) {
                        if (err != null) {
                            done(err, null);
                        }
                        else {
                            resultItem[key] = value;
                            done(null, null);
                        }
                    }, path);
                });
            });
        };
        for (var key in constraints) {
            var state_1 = _loop_1(key);
            if (typeof state_1 === "object") return state_1.value;
        }
        asyncGroup.run();
    };
    return SchemaItem;
}());
exports.SchemaItem = SchemaItem;
//# sourceMappingURL=SchemaItem.js.map