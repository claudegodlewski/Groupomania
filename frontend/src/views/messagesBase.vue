<!-- # Mur: messages # -->
<script>
import publicationDeconnexionEntete from '../components/publicationDeconnexionEntete.vue';
import messagesAPI from '../components/messagesAPI.vue';

export default {
  components: {
    'publication-deconnexion-entete': publicationDeconnexionEntete,
    'messages-api': messagesAPI,
  },
  mounted() {
  },
  data() {
    return {
    };
  },
};
</script>

<template>
  <div class="content">
    <publication-deconnexion-entete></publication-deconnexion-entete>
    <div>
      <div>
      <h3>Messages:</h3>
      </div>
    </div>
  <messages-api></messages-api>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  color: #FFFFFF;
}
</style>
