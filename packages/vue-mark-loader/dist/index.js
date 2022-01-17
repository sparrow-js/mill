"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@mill-too/parser");
function default_1(source) {
    console.log('*******', source, parser_1.default);
    console.log(this);
    return source;
}
exports.default = default_1;
