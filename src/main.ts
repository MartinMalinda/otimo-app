import { createApp } from 'vue'
import './style.scss'
import App from './App.vue';
import { setActivePinia, createPinia } from 'pinia';

const pinia = createPinia();
setActivePinia(pinia);
createApp(App).mount('#app')
