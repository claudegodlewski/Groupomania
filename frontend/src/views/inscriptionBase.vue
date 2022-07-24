<!-- # Accueil: inscription # -->
<script>
import connexionInscriptionEntete from '../components/connexionInscriptionEntete.vue';
import inscriptionAPI from '../components/inscriptionAPI.vue';

export default {
  components: {
    'connexion-inscription-entete': connexionInscriptionEntete,
    'inscription-api': inscriptionAPI,
  },
};
</script>

<template>
  <div class="content">
    <connexion-inscription-entete></connexion-inscription-entete>
    <inscription-api></inscription-api>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
