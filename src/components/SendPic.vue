<template>
  <form class="form" v-if="file">
    <label for="file-input" class="file-label" @click="onFileClick">{{
      file.name
    }}</label>
    <input id="file-input" type="file" @change="onFileChange" hidden />
    <div class="preview-image-container" v-if="preview">
      <img class="preview-image" :src="preview" alt="Aperçu de l'image"/>
    </div>

    <button class="submit-btn" :disabled="loading" @click.prevent="uploadFile">
      {{ loading ? 'Envoi en cours...' : 'Envoyer' }}
    </button>
  </form>
  <form v-else>
    <label for="file-input" class="file-input-label">
      <span class="plus-icon">+</span>
      <span class="file-input-text">Importer une image</span>
    </label>
    <input id="file-input" type="file" @change="onFileChange" hidden />
  </form>
</template>
<style scoped>
.file-label {
  background-color: #eeeeee;
  color: #333333;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  flex: 1;
}

.submit-btn {
  background-color: #007aff;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333333;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 50px;
}

.plus-icon {
  font-size: 32px;
  margin-right: 10px;
}

.file-input-text {
  font-size: 16px;
}

.hidden-input {
  display: none;
}
.preview-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
}

.preview-image {
  max-width: 100%;
  width: 100vw;
}
</style>
<script setup>
import { ref } from "vue";
import { getStorage, ref as stRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../main";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import VueCookies from "vue-cookies";

const file = ref(null);
const preview = ref(null);
const loading = ref(false);

function onFileChange(event) {
  file.value = event.target.files[0];
  preview.value = URL.createObjectURL(file.value);
}

function onFileClick() {
  // Reset the file value to allow the user to choose a new file
  file.value = null;
  preview.value = null;
}

async function uploadFile() {
  try {
    if (!file.value) {
      return;
    }
    loading.value = true; // activation du chargement

    const fileName = `${Math.random()
      .toString(36)
      .substr(2, 8)}-${Date.now()}.jpg`;
    const storageRef = stRef(getStorage(), `pics-challenge/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file.value);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(
      "Uploaded file:",
      snapshot.ref.fullPath,
      "Download URL:",
      downloadURL
    );

    const newPhotoRef = doc(db, "Photos", fileName);
    await setDoc(newPhotoRef, {
      id: fileName,
      uri: downloadURL,
      userId: VueCookies.get("userId"),
      voters: []
    }).then(() => {
      alert('Votre photo a été ajoutée au concours !')
    });

    loading.value = false; // réinitialisation du chargement
  } catch (error) {
    console.error(error);
  }
}

</script>
