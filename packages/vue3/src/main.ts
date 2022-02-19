import { createApp } from "vue";
import App from "./App.vue";
// import { createPinia } from 'pinia'
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {
    createDesigner
  } from '@mill-too/core'
// const pinia = createPinia();
// .use(pinia)

const app = createApp(App)
app.use(Antd);
app.use(router).mount("#app");
const engine = createDesigner({});
engine.mount();