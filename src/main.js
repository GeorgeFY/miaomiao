import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Scroll from "@/components/Better-Scroll";
import Loading from "@/components/Loading";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
/* import Swiper from "swiper" 
import "swiper/dist/css/swiper.min.css"*/
Vue.use(Element);
Vue.prototype.axios = axios;
/* Vue.prototype.Swiper = Swiper; */
Vue.component("Scroll", Scroll);
Vue.component("Loading", Loading);
Vue.filter("SetWH", (url, arg) => {
  return url.replace(/w\.h/, arg);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
