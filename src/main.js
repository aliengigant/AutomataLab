import "devextreme/dist/css/dx.light.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//Import Bootstrap.js for Dropdown Function
import "bootstrap/dist/js/bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/css/bootstrap.min.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
