import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";

const app = createApp(App);
app.config.globalProperties.$api = "http://192.168.1.17";

library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");
