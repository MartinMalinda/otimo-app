import { createRouter, createWebHistory } from "vue-router";

const loadSurvey = () => import('/~/components/pages/Survey.vue');
const loadIndex = () => import('/~/components/pages/Index.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'Index',
    path: '/',
    component: loadIndex,
  }, {
    name: 'Survey',
    path: '/profile/survey',
    component: loadSurvey,
  }]
});

export { router };
