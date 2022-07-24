<!-- Utilisation de "<router-view/>" pour intègrer les composants de chaque route -->
<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<!-- Styles de base de la balise div et de son contenu (<div id="app"><router-view/></div>) -->
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:wght@400;500&family=Shrikhand&display=swap');
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  text-align: center;
}
body {
 background-color: #4E5166;
}
</style>
