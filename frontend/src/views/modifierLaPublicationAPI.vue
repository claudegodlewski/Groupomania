<script>
import Axios from 'axios';
import publicationDeconnexionEntete from '../components/publicationDeconnexionEntete.vue';

export default {
  name: 'updatePost',
  components: {
    'publication-deconnexion-entete': publicationDeconnexionEntete,
  },
  // eslint-disable-next-line object-shorthand
  data() {
    return {
      userId: '',
      systemAdministrator: false,
      systemUser: '',
      editedText: '',
      imageUrl: '',
    };
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    this.localStorageUserId();
    this.gettersSystemAdministrator();
  },
  methods: {
    localStorageUserId() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      this.userId = user.userId;
    },
    // Vuex.
    gettersSystemAdministrator() {
      return this.$store.getters.systemAdministrator;
    },
    fileSelection() {
      // eslint-disable-next-line prefer-destructuring
      this.file = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.file);
    },
    localStorageUpdateText() { // Remplacement du texte.
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const myForm = new FormData();
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      myForm.append('text', this.editedText);

      Axios
        // eslint-disable-next-line prefer-template
        .put('http://localhost:3000/api/post/' + this.$route.params.id, myForm, header)
        .then((response) => {
          console.log(response.data.message);
          // eslint-disable-next-line no-restricted-globals
          this.$router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    localStorageUpdateImage() { // Remplacement de l'image.
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const myForm = new FormData();
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      myForm.append('image', this.file);

      Axios
        // eslint-disable-next-line prefer-template
        .put('http://localhost:3000/api/post/' + this.$route.params.id, myForm, header)
        .then((response) => {
          console.log(response.data.message);
          // eslint-disable-next-line no-restricted-globals
          this.$router.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>
  <div class="content">
    <publication-deconnexion-entete></publication-deconnexion-entete>
    <div class="container">
      <header class="header">
        <h3>Modifier la publication:</h3>
      </header>
      <div class="edit">
        <section>
          <p class="nouveauTexte">Veuillez écrire un texte ci-dessous:</p>
            <textarea v-model="editedText" type="text" aria-label="titre du post"/>
              <footer class="editPied">
                <button class="validerBouton" @click="localStorageUpdateText">
                  Je remplace mon texte
                </button>
              </footer>
        </section>
          <section class="editImage">
            <p class="nouveauImage">Cliquez sur "Parcourir..." pour sélectionner une image:</p>
              <input class="parcourirBouton" type="file"
              @change="fileSelection" ref="file" id="file" name="image"
              accept=".jpg, .jpeg, .gif, .png"  aria-label="modifier l'image"/>
                <img v-show="imageUrl" class="effetPhotoUploadee" :src="imageUrl"
                alt="picture"/>
          </section>
            <footer class="editPied">
              <button class="validerBouton" @click="localStorageUpdateImage">
                Je remplace mon image
              </button>
            </footer>
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
.edit {
@media (max-width: 1024px) {
  width: 60%;
}
@media (max-width: 700px) {
  width: 90%;
}
  background-color: white;
  color: black;
  font-family: Lato, sans-serif;
  margin: 20px 10px;
  width: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  border: 4px;
  border-style: solid;
  border-color: #FFD7D7;
textarea {
  background-color: #FFD7D7;
@media (max-width: 385px) {
  margin-top: 20px;
  width: 85%;
}
  margin-top: 20px;
  width: 90%;
  font-family: Lato, sans-serif;
  font-weight: normal;
  color: black;
  padding: 0px;
  text-align: left;
  height:200px;
  width: 93%;
}
.editImage {
  align-items:center;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.editPied {
  padding: 15px;
}
.validerBouton {
  background-color: #FD2D01;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: 800;
  border: #FD2D01;
  color: white;
  border-radius: 15px;
  height: 30px;
  width: 160px;
}
}
.nouveauTexte {
  font-family: Lato, sans-serif;
  font-weight: normal;
  color: #FD2D01;
  margin-top: 20px;
  margin-bottom:0px;
}
.nouveauImage {
  font-family: Lato, sans-serif;
  font-weight: normal;
  color: #FD2D01;
  margin: 10px;
}
.effetPhotoUploadee {
  width: 95%;
  margin-top: auto;
}
.parcourirBouton {
  background-color: #FFD7D7;
  width:270px;
  border-radius: 5px;
}
</style>
