"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Schema_1 = require("../lib/Schema");
var SchemaMode_1 = require("../lib/SchemaMode");
var chai = require("chai");
var SchemaStore_1 = require("../lib/SchemaStore");
var Str_1 = require("../lib/validators/Str");
var Child_1 = require("../lib/validators/Child");
var Arr_1 = require("../lib/validators/Arr");
var expect = chai.expect;
var should = chai.should();
describe("Population API", function () {
    describe("populate", function () {
        var ThirdChild = (function () {
            function ThirdChild() {
            }
            __decorate([
                Str_1.Str()
            ], ThirdChild.prototype, "title", void 0);
            ThirdChild = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], ThirdChild);
            return ThirdChild;
        }());
        var ChildSchema = (function () {
            function ChildSchema() {
            }
            ChildSchema.prototype.getName = function () { return this.title; };
            __decorate([
                Str_1.Str()
            ], ChildSchema.prototype, "title", void 0);
            __decorate([
                Child_1.Child({ type: ThirdChild })
            ], ChildSchema.prototype, "child", void 0);
            ChildSchema = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], ChildSchema);
            return ChildSchema;
        }());
        var ChildTest = (function () {
            function ChildTest() {
            }
            __decorate([
                Arr_1.Arr({ child: ChildSchema })
            ], ChildTest.prototype, "child", void 0);
            __decorate([
                Arr_1.Arr({ child: Str_1.Str({ maxLength: 3 }) })
            ], ChildTest.prototype, "primitiveArray", void 0);
            __decorate([
                Child_1.Child({ type: ChildSchema })
            ], ChildTest.prototype, "singleChild", void 0);
            ChildTest = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], ChildTest);
            return ChildTest;
        }());
        var result = SchemaStore_1.default.populateSchema(ChildTest, {}, null);
        console.log(result);
    });
});
//# sourceMappingURL=populate.test.js.map