import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

import App from './components/App.vue'

import config from './api/config'
import service from './api/service'

import router from './router/__routerMode__'

config.bizOrigin = _util.url.get('bizOrigin') || _util.url.get('bizorigin') || config.bizOrigin;
config.activityCode = _util.url.get('activityCode') || _util.url.get('activitycode') || config.activityCode;
config.appUrl += config.bizOrigin.toUpperCase();
config.antifraud.tail.bizOrigin = config.bizOrigin;
config.antifraud.tail.activityCode = config.activityCode;

_zax.biz.antifraud(true, config.antifraud.provider, "webactivity", config.env, config.activityCode, () => {
    let tail = config.antifraud.provider == 'seraph' ? { seraph_did: $('#seraph_did').val(), seraph_token: $('#seraph_token').val() } : { afs_scene: $('#afs_scene').val(), afs_token: $('#afs_token').val() }
    $.extend(config.antifraud.tail, tail)
});

//全局注入
Vue.prototype.cfg = config
Vue.prototype.service = service

Vue.config.devtools = config.debug

Vue.use(VueRouter)

//how to regist a config to global?

router.beforeEach((to, from, next) => {
    //let ck = _zax.cookie.get(vconfig.prefix + 'openindex');
    
    store.dispatch('POP_STATUS', 'login', false);
    store.dispatch('WEIXIN_MASK', false);
    
    _zax.ui.mask.hide();
    _zax.ui.loading.hide();
    $('.ui-confirm').remove();
    //$('.ui-confirm').removeClass('ui-confirm-on');
    // if (ck) {
    //     if (to.name !== 'index' && to.name !== 'award') {
    //         next({
    //             path: '/index'
    //         });
    //     }else{
    //         next();
    //     }
    // } else {
    //     next();
    // }

    //scroll to top
    // window.scrollTo(0, 0)
    next();
});

router.afterEach((to, from) => {
    // window.scrollTo(0, 0);
    window._za && window._za.pushData(); //ilog pv uv 统计
    window.bridge && window.bridge.invoke({});
    window.bridge && window.bridge.ready((boot) => {
        boot.onJSInvokeResult('1', document.title);
    });
});

window.router = router;
window.Vue = Vue;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
