"use strict";
var SchemaItem_1 = require("./SchemaItem");
var SchemaMode_1 = require("./SchemaMode");
var _ = require("lodash");
var SchemaStore = (function () {
    function SchemaStore() {
        console.log("Creating schema store!");
        this.schemas = [];
    }
    SchemaStore.prototype.validate = function (item, callback, group, path) {
        if (group === void 0) { group = null; }
        if (path === void 0) { path = item.constructor["name"]; }
        if (item == null || this.getSchema(item.constructor) == null) {
            callback({
                errorCode: "unknownSchema",
                description: "Can not validate this item it does not have an associated schema.",
                path: path
            }, null);
        }
        else {
            this.getSchema(item.constructor).validate(item, callback, group, path);
        }
    };
    SchemaStore.prototype.getRepresentation = function (constructor, group) {
        return this.getSchema(constructor).getSchema(group);
    };
    SchemaStore.prototype.getSchemas = function () {
        return this.schemas;
    };
    SchemaStore.prototype.isPrimitive = function (item) {
        return item == Number || item == String || item == Boolean;
    };
    SchemaStore.prototype.populateSchema = function (constructorT, data, group) {
        var _this = this;
        if (data == null) {
            data = {};
        }
        console.log(constructorT);
        var schema = this.getSchema(constructorT);
        var result = new constructorT();
        if (schema == null) {
            throw new Error("Can not apply schema. Unknown schema");
        }
        var constraints = schema.getConstraintsForGroup(group);
        Object.keys(constraints).map(function (key) {
            var items = constraints[key];
            items.map(function (item) {
                if (_this.isPrimitive(item.type)) {
                    result[key] = data[key];
                }
                else if (item.type == Array) {
                    if (!_this.isPrimitive(item.options["child"]["type"])) {
                        if (_.isArray(data[key])) {
                            result[key] = data[key].map(function (value) {
                                return _this.populateSchema(item.options["child"], value, item.options["group"]);
                            });
                        }
                    }
                    else {
                        result[key] = data[key];
                    }
                }
                else {
                    result[key] = _this.populateSchema(item.type, data[key], group);
                }
            });
        });
        return result;
    };
    SchemaStore.prototype.getSchema = function (constructor) {
        return this.schemas.filter(function (i) {
            return i.getConstructor() == constructor;
        })[0];
    };
    SchemaStore.prototype.addConstraint = function (fn, name, constraint) {
        var constructor = fn.constructor;
        if (this.getSchema(constructor) == null) {
            this.schemas.push(new SchemaItem_1.SchemaItem({ mode: SchemaMode_1.SchemaMode.SHORTEN }, constructor));
        }
        this.getSchema(constructor).addConstraint(name, constraint);
    };
    SchemaStore.prototype.registerSchema = function (constructor, options) {
        if (this.getSchema(constructor) == null) {
            this.schemas.push(new SchemaItem_1.SchemaItem(options, constructor));
        }
        else {
            this.getSchema(constructor).setOptions(options);
        }
    };
    return SchemaStore;
}());
exports.SchemaStore = SchemaStore;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new SchemaStore();
//# sourceMappingURL=SchemaStore.js.map