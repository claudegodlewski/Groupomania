<!-- # Inscription: gestion de l'inscription (envoi des données vers le backend) # -->
<script>
import Axios from 'axios';

export default {
  data() { // Espace de stockage de données simple.
    return {
      // Valeur des champs du formulaire par défaut.
      systemUser: '', // Pseudo de l'utilisateur.
      email: '',
      password: '',
      error: false, // Status de l'erreur.
      errorMsg: '', // Message à affichier en cas d'erreur.
    };
  },
  methods: { // Mise à disposition de la fonction signupUtilisateur.
    signupUtilisateur() {
      if (this.systemUser === '' || this.email === '' || this.password === '') {
        this.error = true;
        this.errorMsg = 'Erreur: veuillez remplir tous les champs.';
      } else {
        this.error = false;
        this.errorMsg = '';

        Axios
          .post('http://localhost:3000/api/auth/signup', {
            systemUser: this.systemUser,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response.data.message);
            this.$router.push('/'); // Redirection vers l'accueil après inscription ('/').
          }).catch((err) => {
            console.log(err.response.data.message);
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
          <label htmlFor="systemUser">Nom d'utilisateur:
            <input type="text" id="systemUser" name="systemUser" v-model="systemUser">
          </label>
      </div>
      <div>
          <label htmlFor="mail">E-mail:
            <input type="email" id="email" name="email" v-model="email">
          </label>
      </div>
      <div>
          <label htmlFor="password">Mot de passe:
            <input type="password" id="password" name="password" v-model="password">
          </label>
      </div>
      <div v-show="error" class="error">{{ errorMsg }}</div>

      <button @click.prevent="signupUtilisateur()" type="submit" class="button">
        Valider
      </button>
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
