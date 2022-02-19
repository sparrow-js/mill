"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@mill-too/parser");
console.log('*************8******')
function default_1(source) {
    const templateSource = (source.match(/<template>([\s\S])*<\/template>/g) || [])[0];
    const parserTemplate = parser_1.default(templateSource, this.resourcePath);
    return source.replace(/<template>([\s\S])*<\/template>/g, parserTemplate);
}
exports.default = default_1;
