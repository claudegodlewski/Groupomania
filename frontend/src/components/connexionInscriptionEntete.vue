<!-- # Connexion: gestion de l'entête, (boutons de connexion et d'inscription, logo etc.) # -->
<template>
  <div>
    <header class="header">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="Groupomania" class="logo">
    </header>
        <nav>
          <!-- "router-link" (pas de rafraichissement de la page: SPA) -->
          <!-- https://vueschool.io/articles/vuejs-tutorials/how-to-use-vue-router-a-complete-tutorial -->
          <!-- https://openclassrooms.com/fr/courses/6390311-creez-une-application-web-avec-vue-js/6863526-gerez-la-navigation-de-votre-application-avec-le-routeur-vue -->
          <router-link to="/">Connexion</router-link>
          <router-link to="/signup">Inscription</router-link>
        </nav>
  </div>
</template>

<!-- Couleurs et styles de l'entête (boutons de connexion et d'inscription, logo etc.) -->
<style lang="scss" scoped>
.header {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.logo {
  width: 300px;
}
nav a {
  background-color: #FFFFFF;
  color: #FD2D01;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: bold;
  text-decoration: none;
  height: 30px;
  width: 110px;
  padding: 5px 15px;
  margin: 10px;
  border-radius: 25px;
}
nav a.router-link-exact-active {
  background-color: #FD2D01;
  color: #FFFFFF;
}
</style>
