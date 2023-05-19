import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Map from "./components/Map.vue";
import SendPic from "./components/SendPic.vue";
import Gallery from "./components/Gallery.vue";
import Tickets from "./components/Tickets.vue";
import AddUser from "./components/AddUser.vue";

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
    {
      path: "/tickets",
      component: Tickets,
      name: "tickets"
    },
    {
      path: "/add-user",
      component: AddUser,
      name: "add-user"
    },
  ],
});
