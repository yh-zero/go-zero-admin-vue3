import { createApp } from 'vue';
// css
import './style.css';
import './styles/index.scss';
import './styles/nprogress.scss';
import './tailwind.css';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import { store } from '@/store';
import { setupGlobDirectives } from '@/directives';
// UI
import { DatePicker } from 'ant-design-vue';

// main.js
const app = createApp(App);
app.use(DatePicker);
app.use(router);
// 配置 store
app.use(store);
// 注册全局指令
setupGlobDirectives(app);
app.mount('#app');
