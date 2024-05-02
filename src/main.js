import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Importamos bootstrap
import './styles/styles.scss'

createApp(App)
    .use(store) //El store se debe de poner en el punto más alto
    .use(router)
    .mount('#app')
