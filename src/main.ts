import { createApp } from 'vue'
import './style.scss'
import App from './App.vue';
import { setActivePinia, createPinia } from 'pinia';
import { router } from '/~/router';

const pinia = createPinia();
setActivePinia(pinia);
const app = createApp(App);
app.use(router);
app.mount('#app');
