import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/styles/index.scss";

import { createHead } from "@unhead/vue/client";

const app = createApp(App);
const head = createHead();

app.use(head);

app.use(createPinia());

app.use(router);

app.mount("#app");
