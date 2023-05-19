<template>
  <v-tabs v-model="tab" bg-color="primary">
    <v-tab value="65km" to="/map65">6,5km</v-tab>
    <v-tab value="115km" to="/map115">11,5km</v-tab>
    <v-tab value="21km" to="/map21">21km</v-tab>
  </v-tabs>

  <div id="map"></div>
  <div id="call_menu">
    <v-btn href="tel:+33671465443" id="sos_bouvrun" prepend-icon="mdi-phone" variant="outlined">
      SOS Bouv'Run
    </v-btn>
  </div>
</template>
<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
</script>
<script>
export default {
  mounted() {
    // Récupérer la div qui contiendra la carte
    const mapContainer = document.getElementById("map");

    // Initialiser la carte avec les coordonnées de votre choix
    const map = L.map(mapContainer).setView([48.8566, 2.3522], 13);

    // Ajouter le tile layer pour la carte OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    var gpx = "./GPX/115.gpx";

    new L.GPX(gpx, {
      async: true,
      marker_options: {
        startIconUrl: "",
        endIconUrl: "",
        shadowUrl: "",
      },
      polyline_options: { color: "red" },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
        console.log(e.target.get_elevation_max());
      })
      .addTo(map);

    // Ajouter une icône pour la localisation
    const locationIcon = L.icon({
      iconUrl: "markers/location.gif",
      iconSize: [50, 25],
    });

    // Ajouter un marqueur pour la localisation
    let locationMarker = null;
    function onLocationFound(e) {
      const radius = e.accuracy / 2;
      if (locationMarker) {
        map.removeLayer(locationMarker);
      }
      locationMarker = L.marker(e.latlng, { icon: locationIcon }).addTo(map);
      locationMarker.bindPopup("Vous êtes ici !").openPopup();
    }

    const dropIcon = L.icon({
      iconUrl: "markers/drop.png",
      iconSize: [25, 25], // taille de l'image en pixels
    });
/* 
    const ravito1 = L.marker([50.741487, 2.042153], { icon: dropIcon })
      .addTo(map)
      .bindPopup("💧 1er Ravitaillement (Test)");
    const ravito2 = L.marker([50.74159, 2.009182], { icon: dropIcon })
      .addTo(map)
      .bindPopup("💧 1er Ravitaillement (Test)");
    const ravito3 = L.marker([50.729151, 2.004476], { icon: dropIcon })
      .addTo(map)
      .bindPopup("💧 1er Ravitaillement (Test)");
    const ravito4 = L.marker([50.728187, 2.049944], { icon: dropIcon })
      .addTo(map)
      .bindPopup("💧 1er Ravitaillement (Test)");
 */
    map.on("locationfound", onLocationFound);

    // Activer la géolocalisation et centrer la carte sur la position de l'utilisateur
    map.locate({ setView: true, maxZoom: 16 });
  },
};
</script>
<style>
#map {
  height: calc(100%);
  width: 100%;
}

#call_menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  height: 50px;
}

#sos_bouvrun {
  margin-top: 8px;
  margin-left: 50%;
  transform: translate(-50%);
}
</style>
