<!-- # Création d'une publication: récupération localstorage + envoi vers backend # -->
<script>
import Axios from 'axios';
// Importation du composant "publicationDeconnexionEntete".
import publicationDeconnexionEntete from '../components/publicationDeconnexionEntete.vue';

const date = new Date(); // Récupération de la date.
const dateHeureFormatSimple = date.toLocaleString('fr', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Affichage dans un format simple.

export default {
  name: 'publicationDeconnexionEntete',
  components: {
    // Enregistrement d'un composant via la propriété "components"
    'publication-deconnexion-entete': publicationDeconnexionEntete,
  },
  data() {
    return {
      systemUser: '', // Utilisateur.
      dateHeure: `${dateHeureFormatSimple}`, // Date.
      text: '', // Texte.
      selectedFile: '', // Image.
      isDisabled: true, // Voir bouton.
    };
  },
  mounted() {
    this.getUtilisateur();
  },
  methods: {
    getUtilisateur() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      this.systemUser = user.systemUser;
    },
    murCreation() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const formData = new FormData();
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      formData.append('systemUser', user.systemUser);
      formData.append('userId', user.userId);
      formData.append('dateHeure', this.dateHeure);
      formData.append('text', this.text);
      formData.append('image', this.selectedFile);
      Axios
        .post('http://localhost:3000/api/post/', formData, header)
        .then(() => {
          // eslint-disable-next-line no-restricted-globals
          this.$router.push('/home');
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedFile = event.target.files[0];
    },
    check() {
      if (this.text.length >= 1) {
        this.isDisabled = false;
      }
      if (this.text.length < 1) {
        this.isDisabled = true;
      }
    },
  },
};
</script>

<template>
  <div class="content">
    <!-- Utilisation du composant "publicationDeconnexionEntete" (voir ligne 12) -->
    <publication-deconnexion-entete></publication-deconnexion-entete>
    <div class="container">
      <h3>Créer une publication:</h3>
    <div class="post">
      <div class="postSystemUser">Laissez libre cours à votre imagination ici.</div>
      <textarea
        aria-label="titre de la publication"
        type="title"
        id="title"
        name="title"
        v-model="text"
        maxlength="600"
        @input="check"
      />
      <input
        aria-label="Ajoutez votre image"
        ref="fileInput"
        style="display: none"
        type="file"
        name="image"
        @change="onFileSelected"
        accept="image/*"
      />
      <button id="ajouterUneImage" @click="$refs.fileInput.click()">
        Ajouter une image
      </button>
      <div class="fichierSelection">
        {{ selectedFile.name }}
      </div>
    </div>
    <div>
        <button
          class="validerBouton"
          @click="murCreation"
          type="submit"
          :disabled="isDisabled">
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:wght@400;500&family=Shrikhand&display=swap');

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h3 {
  color: white;
  display: flex;
  align-items: flex-start;
  margin: 20px 10px;
}
.post {
@media (max-width: 1024px) {
  width: 60%;
}
@media(max-width: 809px) {
  width: 72%;
}
  background-color: white;
  color: black;
  border-radius: 25px;
  font-family: Lato, sans-serif;
  margin: 20px 10px;
  width: 550px;
  display: flex;
  flex-direction: column;
  border: 4px;
  border-style: solid;
  border-color: #FFD7D7;
.postSystemUser {
  font-family: Lato, sans-serif;
  font-weight: normal;
  color: #FD2D01;
  margin-top: 10px;
}
textarea {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 0px;
  font-family: Lato, sans-serif;
  font-weight: 400;
  color: black;
  padding: 0px;
  text-align: left;
  height:200px;
  background-color: #FFD7D7;
}
#ajouterUneImage {
  background-color: #FD2D01;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: bold;
  border: white;
  color: #FFFFFF;
  border-radius: 25px;
  width: 129px;
  height: 23px;
  margin: auto;
}
}
.validerBouton {
  background-color: white;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: bold;
  border: white;
  color: #FD2D01;
  border-radius: 25px;
  height: 30px;
  width: 70px;
  margin: auto;
}
.fichierSelection {
  margin-bottom: 10px;
}
</style>
