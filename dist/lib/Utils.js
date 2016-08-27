"use strict";
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
//# sourceMappingURL=Utils.js.map