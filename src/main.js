// Import Vue.js and base files
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/base.css';

// Create the Vue.js app
const app = createApp(App);

// Use the Vue.js router
app.use(router);

// Mount the app to the HTML root element
app.mount('#app');
