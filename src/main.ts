import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { setActivePinia, createPinia } from 'pinia';

const pinia = createPinia();
setActivePinia(pinia);
createApp(App).mount('#app')
