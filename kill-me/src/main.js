import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { BootstrapVue3, IconsPlugin } from "bootstrap-vue-3";
import "./assets/global.css";
// import { IconsPlugin } from "bootstrap-icons";

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";

const app = createApp(App);
app.config.globalProperties.$api = "http://192.168.1.17";

app.use(router);
app.mount("#app");
