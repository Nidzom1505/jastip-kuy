import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routers.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

createApp(App).use(router).mount('#app');
