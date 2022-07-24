<!-- # Publication et déconnexion: endpoints "/" "/home" et "/post" + Localstorage etc. # -->
<script>
import Vue from 'vue';

Vue.config.productionTip = false;

export default {
  components: {
  },
  // eslint-disable-next-line object-shorthand
  data: function () {
    return {
      showModal: false,
    };
  },
  // Nettoyage du stockage local après déconnexion, et redirection vers la route '/'.
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<!-- HTML -->
<template>
<div>
  <header>
    <div class="header">
      <!-- Le logo pointe vers la route "/home". -->
      <router-link to="/home">
        <img src="../assets/icon-left-font-monochrome-white.png" alt="Groupomania" class="logo">
      </router-link>
      <!-- "Créer une publication" pointe vers la route "/post". -->
        <router-link to="/post">
          <button type="submit" class="creerUnePublication">Créer une publication</button>
        </router-link>
          <button id="logout-button"
            @click.prevent="Logout()" type="submit" class="deconnexion">Déconnexion
          </button>
    </div>
  </header>
</div>
</template>

<!-- Couleurs et styles du logo et des boutons -->
<style lang="scss" scoped>
header {
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: #4E5166;
  margin:auto;
}
.logo {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
}
.creerUnePublication {
  background-color: white;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: bold;
  border: white;
  color: #FD2D01;
  border-radius: 25px;
  text-decoration: none;
  height: 30px;
  width: 160px;
  margin:10px;
  }
.deconnexion {
  background-color: white;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: bold;
  border: white;
  color: #FD2D01;
  border-radius: 25px;
  text-decoration: none;
  height: 30px;
  width: 110px;
  margin:10px;
  }
</style>
