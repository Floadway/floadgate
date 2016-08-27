"use strict";
var SchemaStore_1 = require("./SchemaStore");
function Schema(options) {
    return function (constructor) {
        SchemaStore_1.default.registerSchema(constructor, options);
    };
}
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map