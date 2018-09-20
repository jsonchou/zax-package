import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import state from './vuex/state';

import App from './App.vue';

import SDK from "../../_base/sdk";
import Share from "../../_base/share";

import config from './api/config';
import service from './api/service';
import util from './api/util';
import storage from './api/storage';

import filters from './api/filters';
import directives from './api/directives';
import router from './router/__routerMode__';

import './scss/main.scss';

// 无限前置
if (_zax.device.weixin) {
    const { dmAccountTicket, dmNoRedirect } = storage.cookieNames;
    if (_zax.cookie.get(config.token) || _zax.cookie.get(dmAccountTicket) || _zax.cookie.get(dmNoRedirect)) {
        // me._wxQuietAuth(); // 微信自动授权，静默登录
    } else {
        let url = location.href;
        url = _util.url.set(url, 'channel', config.channelId);
        url = encodeURIComponent(url);
        let wxurl = `${config.wxQuietAuthApi}?env=${config.wxenv}&url=${url}`;
        location.href = wxurl;
    }
}


//debug
config.debug = config.debug || !!_util.url.get('_zax');

//config 补充
config.bizOrigin = _util.url.get('bizOrigin');
config.activityCode = _util.url.get('activityCode') || location.pathname.replace('/v/', '').replace('/', '').replace('/test', '');

if (config.bizOrigin) {
    config.appUrl += config.bizOrigin.toUpperCase();
    _zax.cookie.set('bizOrigin', config.bizOrigin);
    if(_zax.device.weixin) {
        config.appUrl = _util.url.set(config.appUrl, 'model', 'wechat');
        config.appUrl = _util.url.set(config.appUrl, 'ckey', _util.url.get('ckey')); // ckey 为应用宝app下载标识
        // config.appUrl = _util.url.set(config.appUrl, 'target', ''); // app内打开页面地址
    }
}

if (config.machine.indexOf('-uat') > -1) {
    config.cmsApi = `//mgw-uat.zhongan.com`;
    config.wxApi = `//weixin.zhongan.com/weixin_qa`;
}

config.antifraud.tail.bizOrigin = config.bizOrigin;
config.antifraud.tail.activityCode = config.activityCode;

util.event.antifraud(true, config.antifraud.provider, "webactivity", config.env, config.activityCode, () => {

    let tail = {
        seraph_did: $('#seraph_did').val(),
        seraph_token: $('#seraph_token').val()
    }
    
    Object.assign(config.antifraud.tail, tail);

    _util.url.get('msgSendId') && _zax.cookie.set('msgSendId', _util.url.get('msgSendId'), 1)
    _util.url.get('activityUrl') && _zax.cookie.set('activityUrl', _util.url.get('activityUrl'), 1)
    _util.url.get('bizOrigin') && _zax.cookie.set('bizOrigin', _util.url.get('bizOrigin'), 1)
    _util.url.get('accessKey') && _zax.cookie.set(config.token, _util.url.get('accessKey'), 1 / 24 / 2)

    config.debug && _zax.use('vconsole', () => {
        new VConsole();
    });

    //全局注入
    Vue.prototype.cfg = config;
    Vue.prototype.service = service;
    Vue.prototype.util = util;
    Vue.prototype.storage = storage;
    Vue.prototype.SDK = SDK;
    Vue.prototype.Share = Share;

    //挂载filters
    Object.keys(filters).map(item => {
        Vue.filter([item], filters[item]);
    })

    //注册全局directives
    Object.keys(directives).map(item => {
        Vue.directive([item], directives[item]);
    })

    Vue.config.devtools = config.debug

    Vue.use(VueRouter)

    // global log
    console.warn('--global log--')
    console.log(`//debug：${config.debug ? 'debug模式' : '非debug模式'}`)
    console.log(`//device：${config.device}`)
    console.log(`//bizOrigin：${config.bizOrigin}`)
    console.log(`//activityCode：${config.activityCode}`)
    console.log(`//location search：${location.search}`)
    console.log(`//location hash：${location.hash}`)
    console.log(`//登录状态：%c${_zax.cookie.get(config.token) ? '登录' : '未登录'}`, 'color:red')
    console.log(`//网址：${config.machine || '正式'}`)
    console.log(`//接口环境：%c${config.machineBox || '正式'}`, 'color:red')
    console.log(`//静态资源：${config.assetsPath}`)
    console.log(`//构建时间：%c'__buildTime__'`, 'color:red')
    console.log(`//msgSendId：${_util.url.get('msgSendId')}`)
    console.log(`//activityUrl：${_util.url.get('activityUrl')}`)
    console.log(`//accessKey：${_util.url.get('accessKey')}`)
    console.warn('--global log--')

    router.beforeEach((to, from, next) => {

        document.title = to.meta.title || config.biz.title || '众安保险'; //动态设置标题

        _zax.device.app && Share.hideIcon();

        try {
            _zax.device.app && SDK('setNavigationBarTitle', {
                "title": document.title,
            }, res => {
                console.log('title res', res)
            });
        } catch (err) {
            throw err;
        }

        next();

    });

    router.afterEach((to, from) => {
        store.commit('PAGE_NAME', to.name);
        window._za && window._za.pushData(); //ilog pv uv 统计
        if (to.meta.share) {
            util.event.lazyAntifraud(config, () => {
                setTimeout(() => {
                    Share.showIcon({}, store._vm.shareInfo)
                }, 2000);
            });
        }
    });

    window.router = router;
    window.Vue = Vue;

    window.vApp = new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app');
});
