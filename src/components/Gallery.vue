<template>
  <v-container fluid>
    <v-row justify="center" style="margin-top: 10px;">
      <v-col v-for="(photo, index) in photos" :key="index" cols="12" md="6" lg="4" class="text-center">
        <v-card @click="voteForPhoto(photo.id)">
          <v-img :src="photo.uri" max-width="100%"></v-img>
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
import { ref } from "vue";
import { getStorage, ref as stRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../main";
import { collection, addDoc, setDoc, updateDoc, doc, getDocs, getDoc } from "firebase/firestore";
import VueCookies from "vue-cookies";

const usersCollection = collection(db, "Users");
const photos = ref([]);
const userId = VueCookies.get("userId");

const snackbar = ref(false);
const snackbarColor = ref('success');
const successSnackbarMessage = "Vote pris en compte !";
const showSuccessSnackbar = ref(false);


// Récupérer tous les documents de la collection Users
getDocs(usersCollection)
  .then((querySnapshot) => {
    const photosMap = new Map();

    // Itérer sur chaque document
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Vérifier si le document a un champ "photos" et que c'est un tableau
      if (data.hasOwnProperty("photos") && Array.isArray(data.photos)) {
        const photos = data.photos;

        // Itérer sur chaque photo du document et les ajouter à la Map
        photos.forEach((photo) => {
          if (photo.userId != userId)
            photosMap.set(photo.id, photo);
        });
      }
    });

    // Utiliser la Map contenant toutes les photos
    photos.value = Array.from(photosMap.values());
    console.log(photos.value);
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });

// Fonction pour voter pour une photo
// Fonction pour voter pour une photo
const voteForPhoto = async (photoId) => {

  if (!userId) {
    console.error("User ID not found in cookies.");
    return;
  }

  // Récupérer tous les documents de la collection Poll
  const pollCollection = collection(db, "Poll");
  const querySnapshot = await getDocs(pollCollection);

  // Vérifier si l'utilisateur a déjà voté pour une photo
  let oldVoteDoc;
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if (data.hasOwnProperty("voters") && Array.isArray(data.voters)) {
      const voters = data.voters;

      // Si l'utilisateur a déjà voté, supprimer son vote
      if (voters.indexOf(userId) !== -1) {
        oldVoteDoc = doc;
        const newVoters = voters.filter((voter) => voter !== userId);
        updateDoc(doc.ref, { voters: newVoters });
      }
    }
  });

  const photoDocRef = doc(db, "Poll", photoId);
  const photoDoc = await getDoc(photoDocRef);

  if (photoDoc.exists()) {
    const voters = photoDoc.data().voters;

    if (voters && voters.indexOf(userId) !== -1) {
      console.log(`User ${userId} has already voted for photo ${photoId}.`);
      return;
    }

    await updateDoc(photoDocRef, {
      voters: [...(voters || []), userId],
    });
    console.log(`User ${userId} has voted for photo ${photoId}.`);
  } else {
    await setDoc(photoDocRef, {
      voters: [userId],
    });
    console.log(`User ${userId} has voted for photo ${photoId}.`);
  }
  showSuccessSnackbar.value = true;
};


</script>

<style scoped>
  .v-image__image {
    object-fit: contain;
  }
</style>
