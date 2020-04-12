import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Record from "../views/Record";
import Diary from "../views/Diary";
import Analyse from "../views/Analyse";
import Balance from "../views/Balance";
import User from "../views/User";
import DiaryCreate from "../components/diary/DiaryCreate";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/home/record',
                name: 'Record',
                component: Record,
            },
            {
                path: '/home/diary',
                name: 'Diary',
                component: Diary,
                children: [
                    {
                        path: '/home/diary/create',
                        name: 'DiaryCreate',
                        component: DiaryCreate,
                    }
                ]
            },
            {
                path: '/home/analyse',
                name: 'Analyse',
                component: Analyse,
            },
            {
                path: '/home/balance',
                name: 'Balance',
                component: Balance,
            },
            {
                path: '/home/user',
                name: 'User',
                component: User,
            }
        ]
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router
