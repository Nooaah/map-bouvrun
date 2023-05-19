<template>
  <div>
    <h1>Créer un nouvel utilisateur</h1>
    <form>
      <label>
        Email
        <input type="text" placeholder="Email" v-model="email" />
      </label>
      <button @click.prevent="addUser">Créer</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from '../main';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

function generateRandomEmail() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

var email = generateRandomEmail();

export default {
  name: "AddUser",
  setup() {
    
    const password = "teamBouvrun"
    const errMessage = ref("");

    const addUser = async () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email + "@gmail.com", password)
        .then((data) => {
          console.log("Nouvel utilisateur créé");
          const userRef = doc(collection(db, "Users"), auth.currentUser.uid);
          setDoc(userRef, {
            identifiant: email
          });
          errMessage.value = "";
          email = generateRandomEmail();
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              errMessage.value = "Cet email est déjà utilisé";
              break;
            case "auth/invalid-email":
              errMessage.value = "Mauvais adresse Email";
              break;
            case "auth/weak-password":
              errMessage.value = "Mot de passe trop faible";
              break;
            default:
              errMessage.value = "";
              break;
          }
        });
    };

    return {
      email,
      password,
      errMessage,
      addUser,
    };
  },
};
</script>
