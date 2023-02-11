import { createRouter, createWebHistory } from "vue-router";

const loadSurvey = () => import('/~/components/pages/Survey.vue');
const loadIndex = () => import('/~/components/pages/Index.vue');
const loadJourney = () => import('/~/components/pages/Journey.vue');
const loadParley = () => import('/~/components/pages/Parley.vue');
const loadSignout = () => import('/~/components/pages/Signout.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'Index',
    path: '/',
    component: loadIndex,
  }, {
    name: 'Survey',
    path: '/survey',
    component: loadSurvey,
  }, {
    name: 'Journey',
    path: '/journey',
    component: loadJourney,
  }, {
    name: 'Parley',
    path: '/parley',
    component: loadParley,
  }, {
    name: 'Signout',
    path: '/signout',
    component: loadSignout,
  }]
});

export { router };
