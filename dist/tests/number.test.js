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
var Nr_1 = require("../lib/validators/Nr");
var should = chai.should();
describe("Number", function () {
    describe("validate", function () {
        it("make sure the value passed is a number", function () {
            var Test = (function () {
                function Test() {
                }
                __decorate([
                    Nr_1.Nr()
                ], Test.prototype, "value", void 0);
                Test = __decorate([
                    Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
                ], Test);
                return Test;
            }());
            var test = new Test();
            test.value = 13;
            SchemaStore_1.default.validate(test, function (err, item) {
                should.not.exist(err);
                item.value.should.equal(13);
            });
            test["va" + "lue"] = "foobar";
            SchemaStore_1.default.validate(test, function (err, item) {
                err.errorCode.should.equal("notNumber");
                should.not.exist(item);
            });
        });
    });
});
//# sourceMappingURL=number.test.js.map