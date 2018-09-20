import Vue from 'vue';
import VueRouter from 'vue-router';

import index from '../pages/index';
const router = new VueRouter({
    mode: 'hash', //history
    routes: [{
        path: '/',
        component: index,
        name: 'index',
        meta: {
            share: true,
            keepAlive: false,
            title: '',
        }
    }, {
        path: "*",
        redirect: "/"
    }]
})

export default router;