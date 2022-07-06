// Import base files and create Vue.js app with router
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/base.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
