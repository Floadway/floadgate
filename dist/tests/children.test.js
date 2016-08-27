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
var expect = chai.expect;
var should = chai.should();
describe("Children", function () {
    describe("validate", function () {
        var ChildSchema = (function () {
            function ChildSchema() {
            }
            __decorate([
                Str_1.Str()
            ], ChildSchema.prototype, "title", void 0);
            ChildSchema = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], ChildSchema);
            return ChildSchema;
        }());
        var ChildTest = (function () {
            function ChildTest() {
            }
            __decorate([
                Child_1.Child({ type: ChildSchema })
            ], ChildTest.prototype, "child", void 0);
            ChildTest = __decorate([
                Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
            ], ChildTest);
            return ChildTest;
        }());
        it("should report missing nested schema", function () {
            var test = new ChildTest();
            SchemaStore_1.default.validate(test, function (err, res) {
                err.errorCode.should.equal("missingKey");
                expect(res).to.equal(null);
            });
        });
        it("should report invalid nested schema", function () {
            var test = new ChildTest();
            test["child" + ""] = "fooo";
            SchemaStore_1.default.validate(test, function (err, res) {
                err.errorCode.should.equal("invalidChild");
                expect(res).to.equal(null);
            });
        });
        it("should should report errors in the child schema", function () {
            var test = new ChildTest();
            test.child = new ChildSchema();
            test.child["title" + ""] = 0;
            SchemaStore_1.default.validate(test, function (err, res) {
                err.errorCode.should.equal("notString");
                expect(res).to.equal(null);
            });
        });
    });
});
//# sourceMappingURL=children.test.js.map