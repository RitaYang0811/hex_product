import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import 'bootstrap-icons/font/bootstrap-icons.css'

import axios from 'axios'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
