import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import "./assets/global.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
const app = createApp(App);

const eventBus = mitt();

app.config.globalProperties.eventBus = eventBus;

library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);

window.app = app;

app.use(router);
app.mount("#app");

export default app;