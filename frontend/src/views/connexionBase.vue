<!-- # Importation des composants "connexionInscriptionEntete" et "connexionAPI" # -->
<script>
import connexionInscriptionEntete from '../components/connexionInscriptionEntete.vue';
import connexionAPI from '../components/connexionAPI.vue';

export default {
  components: {
    'connexion-inscription-entete': connexionInscriptionEntete,
    'connexion-api': connexionAPI,
  },
};
</script>

<template>
  <div class="content">
    <connexion-inscription-entete></connexion-inscription-entete>
    <connexion-api></connexion-api>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
