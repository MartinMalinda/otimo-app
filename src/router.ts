import { createRouter, createWebHistory } from "vue-router";

const loadSurvey = () => import('/~/components/pages/Survey.vue');
const loadIndex = () => import('/~/components/pages/Index.vue');
const loadJourney = () => import('/~/components/pages/Journey.vue');

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
  }]
});

export { router };
