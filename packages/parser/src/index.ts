import {Parser} from 'htmlparser2';
const Hash =  require('object-hash');
import {generateConsistentUID} from './uid-utils';
const existingIDs: Set<string> = new Set();

export default function (source: string, fileName: string):string {
  let result = '';
  const stack: string[] = [];
  const parser = new Parser({
    onopentag(name, attributes, isImplied) {
      const hash = Hash({
        fileName,
        name,
        props: attributes,
      })
      stack.push(name);
      if (stack.length === 2) {
        attributes['data-file-path'] = fileName;
      }
      const uid = generateConsistentUID(existingIDs, hash);
      existingIDs.add(uid);
      attributes['data-mill-node-id'] = uid;
      let attributesStr = '';
      for (const key in attributes) {
        attributesStr += `${key}="${attributes[key]}" `
      }

      result += `<${name} ${attributesStr}>`;
    },
    ontext(text) {
      result += text;
    },
    onclosetag(tagname) {
      stack.pop();
      result += `</${tagname}>`
    },
  });
  parser.write(
    source
  );
  parser.end();
  return result;
}