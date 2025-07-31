import {createRouter, createWebHistory} from "vue-router";
import Users from "../components/Users.vue";
import EntranceForm from "../components/EntranceForm.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: EntranceForm,
            meta: {requiresAuth: false}
        },
        {
            path: '/users',
            component: Users,
            meta: {requiresAuth: true}
        }
    ]
})

export default router
