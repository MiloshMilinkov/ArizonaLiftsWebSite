import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App).use(i18n).use(router)
router.isReady().then(() => app.mount('#app'))
