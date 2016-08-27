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
var Email_1 = require("../lib/validators/Email");
describe("E-Mail", function () {
    describe("validate", function () {
        it("should recognize an invalid E-Mail address", function () {
            var Test = (function () {
                function Test() {
                }
                __decorate([
                    Email_1.Email()
                ], Test.prototype, "email", void 0);
                Test = __decorate([
                    Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
                ], Test);
                return Test;
            }());
            var test = new Test();
            test.email = "iewjoievejwoib";
            SchemaStore_1.default.validate(test, function (err, item) {
                chai_1.should().not.exist(item);
                chai_1.should().equal(err.errorCode, "notEmail");
            });
            test.email = "foo.bar.com";
            SchemaStore_1.default.validate(test, function (err, item) {
                chai_1.should().not.exist(item);
                chai_1.should().equal(err.errorCode, "notEmail");
            });
            test["e" + "mail"] = 0;
            SchemaStore_1.default.validate(test, function (err, item) {
                chai_1.should().not.exist(item);
                chai_1.should().equal(err.errorCode, "notString");
            });
        });
        it("should allow a valid email ", function () {
            var Test = (function () {
                function Test() {
                }
                __decorate([
                    Email_1.Email()
                ], Test.prototype, "email", void 0);
                Test = __decorate([
                    Schema_1.Schema({ mode: SchemaMode_1.SchemaMode.STRICT })
                ], Test);
                return Test;
            }());
            var test = new Test();
            test.email = "john.doe@fopbar.com";
            SchemaStore_1.default.validate(test, function (err, item) {
                chai_1.should().equal(item.email, test.email);
                chai_1.should().not.exist(err);
            });
        });
    });
});
//# sourceMappingURL=email.test.js.map