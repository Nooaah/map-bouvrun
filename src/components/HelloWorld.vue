<template>
  <h1>Se connecter</h1>
  <p><input type="text" placeholder="Numéro d'inscrit" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p v-if="errMessage">{{ errMessage }}</p>
  <p><button @click="register">Connexion</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const errMessage = ref("");
const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value + "@gmail.com", password.value)
    .then((data) => {
      console.log("bien enregistré");
      console.log(auth.currentUser);
      router.push("/test");
      errMessage.value = "";
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          errMessage.value = "Mauvais adresse Email";
          break;
        case "auth/user-not-found":
          errMessage.value = "Aucun compte trouvé";
          break;
        case "auth/wrong-password":
          errMessage.value = "Mot de passe incorrect";
          break;
        default:
          errMessage.value = "Email ou mot de passe incorrect";
          break;
      }
    });
};
</script>
