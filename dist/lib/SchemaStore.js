"use strict";
var SchemaItem_1 = require("./SchemaItem");
var SchemaMode_1 = require("./SchemaMode");
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