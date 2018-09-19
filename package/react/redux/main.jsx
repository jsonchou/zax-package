// https://stackoverflow.com/a/33527883
require("babel-core/register");
require("babel-polyfill");

import React, { Component, PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';

import SDK from "../../_base/sdk";
import Share from "../../_base/share";

import config from './api/config';
import service from './api/service';
import storage from './api/storage';
import util from './api/util';
import mixins from './api/mixin';
import store from './redux/store/index';
// LifeCycleComponent 为了模拟vue-router的全局守卫(beforeEach和afterEach)
import LifeCycleComponent from './components/LifeCycle';
import './api/directive';

// 引入样式
import './scss/main.scss';

// 微信静默授权无限前置
if (_zax.device.weixin) {
    const { dmAccountTicket, dmNoRedirect } = storage.cookieNames;
    if (_zax.cookie.get(config.token) || _zax.cookie.get(dmAccountTicket) || _zax.cookie.get(dmNoRedirect)) {
    } else {
        let url = location.href;
        url = _util.url.set(url, 'channel', config.channelId);
        url = encodeURIComponent(url);
        location.href = `${config.wxQuietAuthApi}?env=${config.wxenv}&url=${url}`;
    }
}

//debug
config.debug = config.debug || !!_util.url.get('_zax');

//config 补充
config.bizOrigin = _util.url.get('bizOrigin');
config.activityCode = _util.url.get('activityCode');

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

util.event.antifraud(true, config.antifraud.provider, "webactivity", config.env, config.activityCode, ({ did, token }) => {

    let tail = {
        seraph_did: did,
        seraph_token: token
    }
    
    Object.assign(config.antifraud.tail, tail);

    _util.url.get('msgSendId') && _zax.cookie.set('msgSendId', _util.url.get('msgSendId'), 1)
    _util.url.get('activityUrl') && _zax.cookie.set('activityUrl', _util.url.get('activityUrl'), 1)
    _util.url.get('bizOrigin') && _zax.cookie.set('bizOrigin', _util.url.get('bizOrigin'), 1)
    _util.url.get('accessKey') && _zax.cookie.set(config.token, _util.url.get('accessKey'), 1 / 24 / 2)

    config.debug && _zax.use('vconsole', () => {
        // let vConsole = new VConsole();
        // console.log('vconsole loaded')
    });

    const tools = {
        SDK,
        Share,
        cfg: config,
        service,
        storage,
    };

    // 把config, share, sdk, storage, service注入到React的原型上
    Object.keys(tools).forEach(key=>{
        PureComponent.prototype[key] = tools[key];
        Component.prototype[key] = tools[key];
    });
    // 注入mixins到React原型上
    Object.keys(mixins).forEach(key=>{
        PureComponent.prototype[key] = mixins[key];
        Component.prototype[key] = mixins[key];
    });

    let App = require('./pages/App').default;
    let routes = require('./router/__routerMode__').default;

    // 清除console控制台
    console.clear();
    // global log
    console.log('%c-------------------- global log ------------------------', 'color: blue;font-weight: bold;')
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
    console.log('%c-------------------- global log ------------------------', 'color: blue;font-weight: bold;')

    const history = config.router.mode === 'hash' ? createHashHistory() : createBrowserHistory();

    const routeConfig = (routeTable = routes) => {
        return (
            <App>
                <Router history={history} >
                    <Switch>
                        {
                            routeTable.map((item, index) => 
                                <Route key={index} path={item.path} exact={item.exact} render={(props) => 
                                    <LifeCycleComponent {...props} Item={item} />} />
                                )
                        }
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </App>
        )
    }

    window.rApp = ReactDOM.render(
        <Provider store={store}>
            {routeConfig()}
        </Provider>,
        document.getElementById('app')
    );
});
