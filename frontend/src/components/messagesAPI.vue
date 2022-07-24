<!-- # Messages: gestion des messages (affichage + localstorage etc.) # -->
<script>
import Axios from 'axios';
import Vue from 'vue';

Vue.config.productionTip = false;

export default {
  // eslint-disable-next-line object-shorthand
  data: function () {
    return {
      userId: '',
      systemAdministrator: '',
      systemUser: '',
      posts: '',
      post: '',
      likes: [],
      liked: null,
    };
  },
  mounted() {
    this.localStorageUserId();
    this.gettersSystemAdministrator();
    this.localStorageSystemUser();
    this.localStorageMessages();
  },
  methods: {
    localStorageUserId() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      this.userId = user.userId;
    },
    gettersSystemAdministrator() {
      this.systemAdministrator = this.$store.getters.systemAdministrator;
    },
    localStorageSystemUser() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      this.systemUser = user.systemUser;
    },
    localStorageMessages() {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      // eslint-disable-next-line  prefer-template
      Axios
        .get('http://localhost:3000/api/post/', header)
        .then((response) => {
          console.log('response', response);
          this.posts = response.data;
          this.user = JSON.stringify(response.data.userId);
        })
        .catch((error) => console.log(error));
    },
    editPublication(post) {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      Axios
        // eslint-disable-next-line prefer-template
        .get('http://localhost:3000/api/post/' + post._id, header)
        .then((res) => {
          console.log('');
          console.log(res);
          // eslint-disable-next-line  prefer-arrow-callback
          this.$router.push({ name: 'EditPage' });
        })
        // eslint-disable-next-line  prefer-arrow-callback
        .catch(function (error) {
          console.log(error);
        });
    },
    deletePost(post) {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      Axios
        // eslint-disable-next-line prefer-template
        .delete('http://localhost:3000/api/post/' + post._id, header)
        .then((response) => {
          console.log('this is response from deletePost');
          console.log(response.data.post);
        })
        .then(() => {
          this.localStorageMessages();
        })
        .catch((err) => {
          console.log('this is error from deletePost');
          console.log(err);
        });
    },
    verifierSiLike(post) {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      console.log('post', post);
      console.log('Utilisateur', user.userId);
      if (post.usersLiked.includes(user.userId)) {
        return false;
      }
      return true;
    },
    likePost(post) {
      const user = JSON.parse(localStorage.getItem('Utilisateur'));
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      const data = {
        likes: true,
        userId: this.userId,
        post: post._id,
      };
      Axios
        // eslint-disable-next-line prefer-template
        .post('http://localhost:3000/api/post/' + post._id + '/like', data, header)
        .then(() => {
          // res.json()
          this.localStorageMessages();
        })
        // eslint-disable-next-line no-shadow
        .catch((error) => console.log(error));
      this.liked = true;
    },
  },
};
</script>

<template>
  <div class="container">
    <article class="card" v-for="post in posts" :key="post._id">
      <header class="cardHeader">
        <p class="cardSystemUser">
          {{ post.systemUser }}
        </p>
        <p class="cardDateHeure">
          {{ post.dateHeure }}
        </p>
      </header>
      <p class="cardContent" v-show="post.text">{{ post.text }}</p>
      <img :src="post.imageUrl" alt= 'Image postée' class= "cardPicture"/>
      <footer>
        <span class="likesNombre">{{post.likes}} likes</span>
          <button class="aimerMessage" v-if="verifierSiLike(post)" @click="likePost(post)">
          J'aime
          </button>
            <button class="modifierMessage" v-if="userId == post.userId || systemAdministrator">
              <router-link :to="{name:'modifierLaPublicationAPI', params: {id:post._id} }">
              Modifier
              </router-link>
            </button>
              <button class="supprimerMessage" @click="deletePost(post)">
                Supprimer
              </button>
      </footer>
    </article>
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
.card{
  @media (max-width: 1024px) {
    width: 75%;
}
  @media (max-width: 809px) {
    width: 70%;
}
  background-color: white;
  color: black;
  border-radius: 25px;
  font-family: Lato, sans-serif;
  margin: 20px 10px;
  width: 850px;
  border: 4px;
  border-style: solid;
  border-color: #FFD7D7;
.cardHeader {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.cardSystemUser {
  display: flex;
  align-items: center;
  padding: 10px 10px 0 10px;
  font-weight: normal;
  margin-top:0px;
  margin-bottom: 10px;
}
.cardDateHeure {
  display: flex;
  align-items: center;
  padding: 10px 10px 0 10px;
  font-weight: normal;
  margin-top:0px;
  margin-bottom: 10px;
}
.cardContent {
  font-weight: normal;
  color: black;
  margin: 10px;
  display: flex;
  text-align: left;
}
.cardPicture {
  padding: 0px;
  object-fit: cover;
  object-position: center;
  width: 90%;
  height: 300px;
  border-radius: 0px;
}
}
.aimerMessage {
  background-color: white;
  border: 0px;
  color:#FD2D01;
  position: static;
  margin: 5px;
  font-weight: bold;
  font-family: Lato, Helvetica, Arial, sans-serif;
}
.likesNombre {
  background-color: white;
  border: 0px;
  color:#000000;
  position: static;
  margin: 5px;
  font-weight: normal;
  font-family: Lato, Helvetica, Arial, sans-serif;
}
.modifierMessage {
  background-color: white;
  border: 0px;
  position: static;
  margin: 5px;
  font-weight: bold;
  font-family: Lato, Helvetica, Arial, sans-serif;
    a:link {
    text-decoration: none;
    }
    a:link{
      color:#FD2D01;
    }
    a:visited{
      color:#FD2D01;
    }
    a:focus{
      color:#FD2D01;
    }
    a:active{
      color:#FD2D01;
    }
}
.supprimerMessage {
  background-color: white;
  border: 0px;
  color:#FD2D01;
  position: static;
  margin: 5px;
  font-weight: bold;
  font-family: Lato, Helvetica, Arial, sans-serif;
}
</style>
