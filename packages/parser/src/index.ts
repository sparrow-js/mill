import {Parser} from 'htmlparser2';
import Hash from 'object-hash';
import { stringifyQuery } from 'vue-router';
import {generateConsistentUID} from './uid-utils';

const existingIDs: Set<string> = new Set();

export default function (context: string, fileName: string) {
  let result = '';
  let stack: string[] = [];
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
      attributes['data-uid'] = uid;
      let attributesStr = '';
      for (let key in attributes) {
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
    `
    <template>
  <div class="hello">
    <br/>
    <h1>{{ msg }}</h1>
    <p :title="test">
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li v-for="item in list"><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
  </div>
  <a></a>
</template>
    `
  );
  parser.end();
  
  console.log('***parser***', result);
}