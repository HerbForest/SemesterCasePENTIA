import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import router from './router';
import './assets/scss/main.scss';
import 'jordium-gantt-vue3/dist/assets/jordium-gantt-vue3.css';

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router);

app.mount('#app');
