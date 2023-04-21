import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";
import SendPic from "./components/SendPic.vue";
import Gallery from "./components/Gallery.vue";

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
    {
      path: "/send-pic",
      component: SendPic,
      name: "send-pic"
    },
    {
      path: "/gallery",
      component: Gallery,
      name: "gallery"
    },
  ],
});
