import Vue from "vue";
import VueRouter from "vue-router";
import cinameRouter from "./cinema";
import mineRouter from "./mine";
import movieRouter from "./movie";
import adminRouter from "./admin";
Vue.use(VueRouter);

const routes = [
  cinameRouter,
  mineRouter,
  movieRouter,
  adminRouter,
  {
    path: "/*",
    redirect: "/movie"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  //base: "miaomiao",
  routes
});

export default router;
