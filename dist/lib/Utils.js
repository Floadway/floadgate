"use strict";
var SchemaMode_1 = require("./SchemaMode");
function makeDefault(value, defaults) {
    for (var _i = 0, _a = Object.keys(defaults); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!value.hasOwnProperty(key)) {
            value[key] = defaults[key];
        }
    }
    return value;
}
exports.makeDefault = makeDefault;
function schemaModeToString(mode) {
    switch (mode) {
        case SchemaMode_1.SchemaMode.STRICT:
            return "STRICT";
        case SchemaMode_1.SchemaMode.SHORTEN:
            return "SHORTEN";
        case SchemaMode_1.SchemaMode.LOOSE:
            return "LOOSE";
    }
}
exports.schemaModeToString = schemaModeToString;
//# sourceMappingURL=Utils.js.map