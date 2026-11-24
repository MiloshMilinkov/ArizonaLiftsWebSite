/*
 * ARIZONALIFTS website
 * Copyright (c) 2026 Miloš Milinkov. All rights reserved.
 * Proprietary and confidential. Use, copying, modification or distribution
 * without written permission is prohibited. See the LICENSE file.
 */
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App).use(i18n).use(router)
router.isReady().then(() => app.mount('#app'))
