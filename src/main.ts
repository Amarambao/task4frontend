import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/router.ts";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import {createBootstrap} from "bootstrap-vue-next";
import {useJwtStore} from "./stores/JwtStore.ts";
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App)

const pinia = createPinia()

app.use(createBootstrap())
app.use(pinia)
app.use(router)

router.beforeEach((to) => {
    const jwtStore = useJwtStore();
    if (to.meta.requiresAuth) {
        if (!jwtStore.isAnyToken() || !jwtStore.isTokenValid()) {
            jwtStore.clearToken();
            return '/';
        }
    }
    return true;
});

app.mount('#app')