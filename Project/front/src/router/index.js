import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index"
import login from "../views/login"
import analyse from "../views/analyse"
import analyseYear from "../views/analyseYear"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/analyse',
        name: 'analyse',
        component: analyse,
    },
    {
        path: '/analyseYear',
        name: 'analyseYear',
        component: analyseYear,
    },

]

const router = new VueRouter({
    routes
})

export default router
