<template>
  <div class="login-container">
    <h1>Se connecter</h1>
    <form>
      <label>
        Identifiant Bouv'Run
        <input type="text" placeholder="Numéro d'inscrit" v-model="email" />
      </label>
      <p v-if="errMessage" class="error-message">{{ errMessage }}</p>
      <button @click.prevent="register">Connexion</button>
    </form>
  </div>
</template>
<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  width: 100%;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}
</style>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import VueCookies from "vue-cookies";

const email = ref("");
const password = "teamBouvrun";
const errMessage = ref("");
const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value + "@gmail.com", password)
    .then((data) => {
      console.log("bien enregistré");
      console.log(auth.currentUser);
      VueCookies.set("userId", auth.currentUser.uid);
      alert("Vous êtes connecté ! Vous pouvez maintenant participer au concours en votant et en envoyant vos photos !");
      errMessage.value = "";
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMessage.value = "Mauvais identifiant";
          break;
        case "auth/user-not-found":
          errMessage.value = "Aucun compte trouvé";
          break;
        case "auth/wrong-password":
          errMessage.value = "Erreur de connexion";
          break;
        default:
          errMessage.value = "";
          break;
      }
    });
};
</script>
