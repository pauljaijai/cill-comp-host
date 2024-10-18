import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import './index.css'

// 自訂樣式
import './style/animate.sass'
import './style/global.sass'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
