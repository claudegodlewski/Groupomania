import Vue from 'vue';
import VueRouter from 'vue-router';
import connexionBase from '../views/connexionBase.vue';
import inscriptionBase from '../views/inscriptionBase.vue';
import messagesBase from '../views/messagesBase.vue';
import creerUnePublicationAPI from '../views/creerUnePublicationAPI.vue';
import modifierLaPublicationAPI from '../views/modifierLaPublicationAPI.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'connexionBase',
    component: connexionBase,
  },
  {
    path: '/signup',
    name: 'inscriptionBase',
    component: inscriptionBase,
  },
  {
    path: '/home',
    name: 'messagesBase',
    component: messagesBase,
  },
  {
    path: '/post',
    name: 'creerUnePublicationAPI',
    component: creerUnePublicationAPI,
  },
  {
    path: '/post/edit/:id',
    name: 'modifierLaPublicationAPI',
    component: modifierLaPublicationAPI,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
