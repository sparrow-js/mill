"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const htmlparser2_1 = require("htmlparser2");
const Hash = require('object-hash');
const uid_utils_1 = require("./uid-utils");
const existingIDs = new Set();
console.log('**************11');
function default_1(source, fileName) {
    let result = '';
    const stack = [];
    const parser = new htmlparser2_1.Parser({
        onopentag(name, attributes, isImplied) {
            const hash = Hash({
                fileName,
                name,
                props: attributes,
            });
            stack.push(name);
            if (stack.length === 2) {
                attributes['data-file-path'] = fileName;
            }
            const uid = uid_utils_1.generateConsistentUID(existingIDs, hash);
            existingIDs.add(uid);
            attributes['data-mill-node-id'] = uid;
            let attributesStr = '';
            for (const key in attributes) {
                attributesStr += `${key}="${attributes[key]}" `;
            }
            result += `<${name} ${attributesStr}>`;
        },
        ontext(text) {
            result += text;
        },
        onclosetag(tagname) {
            stack.pop();
            result += `</${tagname}>`;
        },
    });
    parser.write(source);
    parser.end();
    return result;
}
exports.default = default_1;
