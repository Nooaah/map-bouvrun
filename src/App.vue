<template>
  <v-app>
    <!-- Your appBar goes here -->
    <v-app-bar app>
      <v-toolbar-title>Mon site web</v-toolbar-title>
      <v-list>
        <v-list-item>
          <router-link to="/">Accueil</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/map">Map</router-link>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <div class="mt-12 mt-md-16">
      <!-- La classe mt-12 est utilisée pour les téléphones mobiles -->
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
</script>
