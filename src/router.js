import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HelloWorld,
      name: "root"
    },
    {
      path: "/map",
      component: Map,
      name: "map"
    },
  ],
});
