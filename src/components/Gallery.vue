<template>
  <v-container fluid>
    <v-row style="margin: 10px 0 25px 0;">
      Votez en cliquant votre photo préférée de la Bouv'Run 2023 ! Ajoutez votre photo dans <i>Envoyer ma photo</i>
    </v-row>
    <v-row justify="center">
      <v-col v-for="(photo, index) in photos" :key="index" cols="12" md="6" lg="4" class="text-center">
        <v-card :disabled="userId == photo.userId" @click="voteForPhoto(photo.id)" min-height="150px">
          <v-img :src="photo.uri" max-width="100%"></v-img>
          <p style="margin: 10px 0 10px 0;"><b>{{ index + 1 }}</b> <v-icon class="mr-2 mdi" color="yellow darken-2"
              style="text-shadow: 0px 0px 2px black">mdi-trophy</v-icon>
            ({{ photo.voters.length }} vote{{ photo.voters.length > 1 ? "s" : "" }})</p>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top right>
      {{ successSnackbarMessage }}
    </v-snackbar>
    <v-snackbar v-model="showSuccessSnackbar" color="success" top right>
      {{ successSnackbarMessage }}
    </v-snackbar>
  </v-container>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { getStorage, ref as stRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../main";
import { collection, addDoc, setDoc, updateDoc, doc, getDocs, getDoc, onSnapshot } from "firebase/firestore";
import VueCookies from "vue-cookies";

const photosCollection = collection(db, "Photos");
const photos = ref([]);
const userId = VueCookies.get("userId");

const snackbar = ref(false);
const snackbarColor = ref('success');
const successSnackbarMessage = "Vote pris en compte !";
const showSuccessSnackbar = ref(false);

// Récupérer les documents de la collection Users en temps réel
watchEffect(() => {
  onSnapshot(photosCollection, (snapshot) => {
    const photosMap = new Map();

    // Itérer sur chaque document
    snapshot.forEach((doc) => {
      const data = doc.data();
      photosMap.set(data.id, data);
    });

    // Utiliser la Map contenant toutes les photos
    const photosArray = Array.from(photosMap.values());
    photosArray.sort((photo1, photo2) => {
      return photo2.voters.length - photo1.voters.length;
    });
    photos.value = photosArray;

  });
});

// Fonction pour voter pour une photo
const voteForPhoto = async (photoId) => {

  if (!userId) {
    console.error("User ID not found in cookies.");
    return;
  }

  // Récupérer tous les documents de la collection Photos
  const photosCollection = collection(db, "Photos");
  const querySnapshot = await getDocs(photosCollection);

  // Vérifier si l'utilisateur a déjà voté pour une photo
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if (data.hasOwnProperty("voters") && Array.isArray(data.voters)) {
      const voters = data.voters;
      let index = voters.indexOf(userId);
      if (index !== -1) {
        // La valeur est présente dans le tableau, la supprimer
        voters.splice(index, 1);
      }
      updateDoc(doc.ref, { voters: voters });
    }
  });

  const photoDocRef = doc(db, "Photos", photoId);
  const photoDoc = await getDoc(photoDocRef);
  let data = photoDoc.data();

  // Vérifier si la photo existe dans la collection Photos
  if (!photoDoc.exists()) {
    console.error("Photo not found in Photos collection.");
    return;
  }

  // Ajouter l'utilisateur aux votants
  let voters = data.voters;
  voters.push(userId);
  updateDoc(photoDocRef, { voters: voters });

  // Afficher un message de succès
  showSuccessSnackbar.value = true;
  setTimeout(() => {
    showSuccessSnackbar.value = false;
  }, 2000);
};
</script>

<style>
.rank {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  background-color: #eee;
  margin-right: 10px;
  line-height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>