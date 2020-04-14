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
import {HTTP_HEADER_TOKEN_VAL} from "../const/constant";
import RecordCreate from "../components/record/RecordCreate";
import RecordQry from "../components/record/RecordQry";
import RecordProfitQry from "../components/record/RecordProfitQry";
import RecordHistoryQry from "../components/record/RecordHistoryQry";

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
                children: [
                    {
                        path: '/home/record/create',
                        name: 'RecordCreate',
                        component: RecordCreate,
                    },
                    {
                        path: '/home/record/qry',
                        name: 'RecordCreate',
                        component: RecordQry,
                        children: [
                            {
                                path: '/home/record/qry/history',
                                name: 'RecordHistoryQry',
                                component: RecordHistoryQry,
                            },
                            {
                                path: '/home/record/qry/profit',
                                name: 'RecordProfitQry',
                                component: RecordProfitQry,
                            }
                        ]
                    }
                ]
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
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: '/login'
    },
]

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path.startsWith('/forget') || to.path === '/registry') {
        next();
    } else {
        let token = sessionStorage.getItem(HTTP_HEADER_TOKEN_VAL);
        if (!token || token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});


export default router
