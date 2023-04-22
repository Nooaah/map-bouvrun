<template>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item
          prepend-avatar="@/assets/img/censelette.png"
          title="Bouv'Run App"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Se connecter"
            value="accueil"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-map"
            title="Itinéraires"
            value="map"
            to="/map"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-view-gallery-outline"
            title="Concours Photo"
            value="gallery"
            to="/gallery"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-camera"
            title="Envoyer ma photo"
            value="pic-challenge"
            to="/send-pic"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 1000px">
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

        <v-app-bar :elevation="0" color="grey-darken-4">
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>Bouv'Run</v-toolbar-title>

          <template v-slot:append>
            <v-btn href="tel:+33671465443" icon="mdi-phone"></v-btn>
          </template>

        </v-app-bar>
          <router-view />
          
      </v-main>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
};
</script>
