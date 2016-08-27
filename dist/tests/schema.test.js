"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Schema_1 = require("../lib/Schema");
var SchemaMode_1 = require("../lib/SchemaMode");
var chai_1 = require("chai");
var SchemaStore_1 = require("../lib/SchemaStore");
var Str_1 = require("../lib/validators/Str");
describe("Schema", function () {
    describe("apply", function () {
        var Test = (function () {
            function Test() {
            }
            Test = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], Test);
            return Test;
        }());
        it("should register a schema in the schemaStore", function () {
            chai_1.should().exist(SchemaStore_1.default.getSchema(Test));
        });
    });
    describe("SchemaMode.STRICT", function () {
        var Test = (function () {
            function Test() {
            }
            __decorate([
                Str_1.Str()
            ], Test.prototype, "test", void 0);
            __decorate([
                Str_1.Str()
            ], Test.prototype, "foo", void 0);
            Test = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], Test);
            return Test;
        }());
        it("should require all items to be present", function () {
            var test = new Test();
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(err);
                chai_1.should().equal(err.errorCode, "missingKey");
                chai_1.should().not.exist(newTest);
            });
            test.foo = "bar";
            test.test = "foo";
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(newTest);
                chai_1.should().not.exist(err);
            });
        });
    });
    describe("SchemaMode.LOOSE", function () {
        var Test = (function () {
            function Test() {
            }
            __decorate([
                Str_1.Str()
            ], Test.prototype, "test", void 0);
            Test = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.LOOSE })
            ], Test);
            return Test;
        }());
        it("should require all defined items to be present", function () {
            var test = new Test();
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(err);
                chai_1.should().equal(err.errorCode, "missingKey");
                chai_1.should().not.exist(newTest);
            });
        });
        it("should leave undefined properties untouched", function () {
            var test = new Test();
            test["foo"] = "bar";
            test.test = "foo";
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(newTest);
                chai_1.should().equal(newTest["foo"], "bar");
                chai_1.should().equal(newTest.test, "foo");
                chai_1.should().not.exist(err);
            });
        });
    });
    describe("SchemaMode.SHORTEN", function () {
        var Test = (function () {
            function Test() {
            }
            __decorate([
                Str_1.Str()
            ], Test.prototype, "test", void 0);
            Test = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.SHORTEN })
            ], Test);
            return Test;
        }());
        it("should require all defined items to be present", function () {
            var test = new Test();
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(err);
                chai_1.should().equal(err.errorCode, "missingKey");
                chai_1.should().not.exist(newTest);
            });
        });
        it("should remove undefined properties", function () {
            var test = new Test();
            test["foo"] = "bar";
            test.test = "foo";
            SchemaStore_1.default.validate(test, function (err, newTest) {
                chai_1.should().exist(newTest);
                chai_1.should().not.exist(newTest["foo"]);
                chai_1.should().equal(newTest.test, "foo");
                chai_1.should().not.exist(err);
            });
        });
    });
});
//# sourceMappingURL=schema.test.js.map