import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import bootstrap from "bootstrap";
// import axios from "axios";
// import { IconsPlugin } from "bootstrap-icons";

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";

const app = createApp(App);
app.config.globalProperties.$api = "http://192.168.1.17";

app.use(router);
app.mount("#app");
