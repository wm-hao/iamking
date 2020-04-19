import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Diary from "../components/diary/Diary";
import Analyse from "../components/analyse/Analyse";
import Balance from "../views/Balance";
import User from "../views/User";
import {HTTP_HEADER_TOKEN_VAL} from "../const/constant";
import RecordCreate from "../components/record/RecordCreate";
import RecordProfitQry from "../components/record/RecordProfitQry";
import RecordHistoryQry from "../components/record/RecordHistoryQry";
import Record from "../components/record/Record";
import DiarySelect from "../components/diary/DiarySelect";
import AnalyseFrequency from "../components/analyse/AnalyseFrequency";
import AnalyseTopData from "../components/analyse/AnalyseTopData";
import AnalyseProfit from "../components/analyse/AnalyseProfit";
import AnalyseDuration from "../components/analyse/AnalyseDuration";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/home/record/qry',
                name: 'Record',
                component: Record,
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
                    },
                    {
                        path: '/home/record/create',
                        name: 'RecordCreate',
                        component: RecordCreate,
                    },
                ]
            },
            {
                path: '/home/diary',
                name: 'Diary',
                component: Diary,
                children: [
                    {
                        path: '/home/diary/select',
                        name: 'DiarySelect',
                        component: DiarySelect,
                    }
                ]
            },
            {
                path: '/home/analyse',
                name: 'Analyse',
                component: Analyse,
                children: [
                    {
                        path: '/home/analyse/frequency',
                        name: 'AnalyseFrequency',
                        component: AnalyseFrequency,
                    },
                    {
                        path: '/home/analyse/top',
                        name: 'AnalyseTopData',
                        component: AnalyseTopData,
                    },
                    {
                        path: '/home/analyse/profit',
                        name: 'AnalyseProfit',
                        component: AnalyseProfit,
                    },
                    {
                        path: '/home/analyse/duration',
                        name: 'AnalyseDuration',
                        component: AnalyseDuration,
                    }
                ]
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
