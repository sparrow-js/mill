<template>
  <div id="nav">
    <designer>
      <workbench>
        <workspace></workspace>
      </workbench>
    </designer>
    <div :data-mill="test" @click="testclick">
      {{cursor.type}}
    </div>
    <router-link to="/">Home</router-link>
  </div>
  <router-view />
</template>
<script lang="ts">
import {useCursor} from './hooks/useCursor';
import { 
    ref
} from 'vue';
import {Designer, Workbench, Workspace} from './containers'

export default {
  components:{
    Designer,
    Workbench,
    Workspace
  },
  setup() {
     const cursor = useCursor();
      const test = ref({
        id: 'test'
      })
      const testclick = () => {
        console.log('******8')
      }
     return {
       cursor,
       testclick,
       test
     }
   }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
