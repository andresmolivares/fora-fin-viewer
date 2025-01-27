import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import svgIcon from "./components/SvgIcon.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from "pinia";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const pinia = createPinia();

createApp(App).component("svgIcon", svgIcon).use(pinia).use(vuetify).use(router).mount("#app");
