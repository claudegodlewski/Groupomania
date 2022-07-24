<!-- # Messages: gestion des messages (affichage + localstorage etc.) # -->
<script>
import Axios from 'axios';
import Vue from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// eslint-disable-next-line object-curly-newline
import { faThumbsUp, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faPen, faTrashCan);

Vue.config.productionTip = false;

export default {
  name: 'messagesAPI',
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  },
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
    verifierSiMembresAiment(post) {
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
          Auteur: {{ post.systemUser }}
        </p>
        <p class="cardDateHeure">
          Date: {{ post.dateHeure }}
        </p>
      </header>
      <p class="cardContent" v-show="post.text">{{ post.text }}</p>
      <img :src="post.imageUrl" alt= 'Image postée' class= "cardPicture"/>
      <footer>
        <div>
          <button class="like">
            <font-awesome-icon icon="fa-thumbs-up" class="like"
            v-if="verifierSiMembresAiment(post)"
            @click="likePost(post)"/>
          </button>
          <span class="likeTexte">Likes: {{post.likes}} </span>
        </div>
        <div class="icons" v-if="userId == post.userId || systemAdministrator">
          <router-link :to="{name:'modifierLaPublicationAPI', params: {id:post._id} }">
            <font-awesome-icon icon="fa-pen" class="modifier"/>
          </router-link>
          <font-awesome-icon icon="fa-trash-can" @click="deletePost(post)"
          class="effacer"/>
        </div>
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
  border: 5px;
  border-style: dashed;
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
.likeTexte {
  background-color: white;
  border:0px;
  color:#000000;
  margin:0px;
  position: static;
}
.like {
  background-color: white;
  border:0px;
  color:#FD2D01;
  position: static;
  margin:0px;
}
.modifier {
  color:#FD2D01;
  position: static;
  margin-right:5px;
}
.effacer {
  color:#FD2D01;
  position: static;
  margin-left:5px;
}
</style>
