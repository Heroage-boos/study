import Vue from "vue";
import VueRouter from "vue-router";

//其他路由
import Home from "./home";
import About from "./about";

Vue.useAttrs(VueRouter);

const routers = [...Home, ...About];

export default new VueRouter({
  mode: "history",
  routers,
});
