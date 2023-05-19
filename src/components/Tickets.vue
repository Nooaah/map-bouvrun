<template>
  <v-container>
    <v-row>
      <v-col v-for="(user, index) in users" :key="index" md="6" sm="6">
        <table width="100%" class="ticket page-break">
          <tr>
            <td width="30%" style="padding-right:10px;">
              <h3>Bouv'Run 2023</h3>
              <br>
              Ticket de tombola
              <br>
              Numéro <b>{{ index < 999 ? ('000' + (index + 1)).slice(-3) : index + 1 }}</b>
              <br>
              <br>
              Identifiant <a href="#">bouvrun.fr/app</a> :
              <br>
              <br>
              <div style="text-align:center;">
              <b>{{ user.identifiant }}</b>
              </div>
            </td>
            <td width="70%">
              <h3>Ticket n° {{ index < 999 ? ('000' + (index + 1)).slice(-3) : index + 1 }}</h3>
              <br>
              Nom :
              ......................................................................................
              <br>
              Prénom :
              ......................................................................................
              <br>
              Adresse Email ou Téléphone :
              ......................................................................................
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main';

export default {
  data() {
    return {
      users: [],
    }
  },
  async created() {
    // Récupérer tous les documents de la collection "Users"
    const usersCollection = collection(db, "Users");
    const querySnapshot = await getDocs(usersCollection);

    // Itérer sur chaque document et ajouter les données à l'array "users"
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      this.users.push(data);
    });
  }
}
</script>

<style>
.ticket {
  border: solid 1px lightgrey;
  padding: 15px;
}

.page-break {
  page-break-inside: avoid;
}
</style>