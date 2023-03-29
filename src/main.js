/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // import Firebase Storage

import router from './router'
import vuetify from './plugins/vuetify';

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
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

createApp(App)
  .use(router)
  .use(vuetify)
  .provide('firebaseApp', app) // Ajouter le provide pour l'instance Firebase App
  .provide('firebaseStorage', storage) // Ajouter le provide pour l'instance Firebase Storage
  .mount('#app')
