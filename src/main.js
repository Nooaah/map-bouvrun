/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from "vue-cookies";
// Firebase
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD9KhIlAFzhkWqAo2FUV3J13Je3WXOpmUM",
  authDomain: "bouv-run.firebaseapp.com",
  projectId: "bouv-run",
  storageBucket: "bouv-run.appspot.com",
  messagingSenderId: "210546414816",
  appId: "1:210546414816:web:d5afec1e2da5f071b36c85",
  measurementId: "G-VC9L20XDTH"
};

const app = initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueCookies)
  .mount('#app')