import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue3, IconsPlugin } from "bootstrap-vue-3";
import "./assets/global.css";
// import { IconsPlugin } from "bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

const app = createApp(App);
// app.config.globalProperties.$api = "http://localhost:8080/api";

app.use(BootstrapVue3);
app.use(IconsPlugin);
app.use(router);
app.mount("#app");
