import {Parser} from 'htmlparser2';
import Hash from 'object-hash';

export default function (context: string) {
  let result = '';
  const parser = new Parser({
    onopentag(name, attributes) {
      result += `<${name}>`
      const uid = Hash({
        fileName: '/driver/index.html',
        name,
        props: attributes,
      })
    },
    ontext(text) {
      result += text;
    },
    onclosetag(tagname) {
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
</template>
    `
  );
  parser.end();
  
  console.log('***parser***', result);
}