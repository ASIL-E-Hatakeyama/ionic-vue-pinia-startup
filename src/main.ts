import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/* Pinia Store管理 */
import { createPinia } from "pinia";
import { IonicVue } from "@ionic/vue";
import PrimeVue from "primevue/config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Prime Vue style files  */
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App)
  .use(IonicVue, { swipeBackEnabled: false }) // スワイプで絶対戻らせないマン
  .use(router)
  .use(createPinia())
  .use(PrimeVue);
router.isReady().then(() => {
  app.mount("#app");
});
