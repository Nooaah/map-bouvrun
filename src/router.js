import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Map65 from "./components/Map65.vue";
import Map115 from "./components/Map115.vue";
import Map21 from "./components/Map21.vue";
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
      path: "/map65",
      component: Map65,
      name: "map65"
    },
    {
      path: "/map115",
      component: Map115,
      name: "map115"
    },
    {
      path: "/map21",
      component: Map21,
      name: "map21"
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
