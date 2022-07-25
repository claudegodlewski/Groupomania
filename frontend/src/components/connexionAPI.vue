<!-- # Connexion: gestion du login (connexion du frontend et backend + Localstorage) # -->
<script>
import Axios from 'axios';

export default {
  data() { // Espace de stockage de données simple.
    return {
      error: false,
      errorMsg: '',
      email: '',
      password: '',
    };
  },
  methods: { // Mise à disposition de la fonction loginUtilisateur.
    loginUtilisateur() {
      if (this.email === '' || this.password === '') {
        this.error = true;
        this.errorMsg = 'Les champs ne sont pas tous renseignés.';
      } else {
        this.error = false;
        this.errorMsg = '';
        Axios
          .post('http://localhost:3000/api/auth/login', { // Envoi des données à l'API ('api/auth/login').
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.token) {
              const objectUser = {
                systemUser: response.data.systemUser,
                token: response.data.token,
                userId: response.data.userId,
              };
              localStorage.setItem('Utilisateur', JSON.stringify(objectUser)); // Stockage du token, UserId etc.
              this.$store.dispatch('setRole', response.data.systemAdministrator);
            }
            this.$router.push('/home'); // Redirection vers l'accueil (mur des messages) après validation du login ('/home').
          })
          .catch((error) => {
            this.loading = false;
            this.error = true;
            this.errorMsg = error.response.data.error;
          });
      }
    },
  },
};
</script>

<!-- Formulaire des utilisateurs -->
<template>
  <div class="formulaireContenu">
    <form class="form" action="/" method="post">
      <div>
          <label htmlFor="mail">E-mail:
            <input type="email" id="email" name="user_mail" v-model="email">
          </label>
      </div>
      <div>
          <label htmlFor="password">Mot de passe:
            <input type="password" id="password" name="user_password" v-model="password">
          </label>
      </div>
      <div v-show="error" class="error">{{ errorMsg }}</div>
      <button @click.prevent="loginUtilisateur()" type="submit" class="button">Valider</button>
    </form>
  </div>
</template>

<!-- Couleurs et styles du formulaire -->
<style lang='scss' scoped>
$color-primary : #FD2D01;
.formulaireContenu {
  background-color: white;
  padding: 20px;
  margin: 30px;
  width: 500px;
  border-radius: 25px;
  border: 4px;
  border-style: solid;
  border-color: #FFD7D7;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
}
label {
  color: $color-primary;
  font-weight: normal;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}
input {
  padding: 8px;
  border-radius: 0px;
  border: 1px solid #9E9E9E;
  background-color: #FFD7D7;
}
button {
  background: $color-primary;
  border: $color-primary;
  border-radius: 25px;
  padding: 7px;
  margin: auto;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  margin-top:15px;
  height: 30px;
  width: 90px;
}
@media (max-width: 1024px) {
  .formulaireContenu {
  width: 60%;
  }
}
@media (max-width: 809px) {
  .formulaireContenu {
  width: 72%;
  }
}
</style>
