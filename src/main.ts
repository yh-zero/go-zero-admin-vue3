import { createApp } from 'vue';
// css
import './style.css';
import './styles/index.scss';
import './styles/nprogress.scss';
import './tailwind.css';
import App from './App.vue';
import router from './router';
import { store } from '@/store';
import { setupGlobDirectives } from '@/directives';
import loadAntIcons from './utils/createIcon';
// UI
import 'ant-design-vue/dist/reset.css';

// main.js
const app = createApp(App);
loadAntIcons(app);
app.use(router);
// 配置 store
app.use(store);
// 注册全局指令
setupGlobDirectives(app);
app.mount('#app');
