import Vue from "vue";
import VueRouter from "vue-router";
import cinameRouter from "./cinema";
import mineRouter from "./mine";
import movieRouter from "./movie";
Vue.use(VueRouter);

const routes = [
  cinameRouter,
  mineRouter,
  movieRouter,
  {
    path: "/*",
    redirect: "/movie"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
