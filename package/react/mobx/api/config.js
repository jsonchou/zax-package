//this config file will both have been using in webpack module with __daddy__  params

// base config
const machine = "-test3";
const debug = machine ? true : false;
const spaMode = "__spaMode__"; //vue react
const spaDir = "__spaDir__"; //20161014

let bizOrigin = '';
let activityCode = '';

if (!process) {
    //broswer environment
    bizOrigin = window._util.url.get('bizOrigin') || window._util.url.get('bizorigin') || 'APP517dxzp';
    activityCode = window._util.url.get('activityCode') || window._util.url.get('activitycode') || 'cpgj';
}

module.exports = {
    debug,
    router: {
        split: false, //是否使用路由方式代码分割，超过10条路由，建议采用，默认为false
        mode: 'hash', //当前构建环境（单webpack多spa）不能很好支持browser模式，（单webpack单spa）比较适合browser模式（修改路由path层级+Nginx伪静态路由配置部署）
    },
    spaMode,
    spaDir,
    kf: `http://kf${machine}.demo.com`,
    token: 'zaLoginCookieKey',
    loginUrl: `https://login${machine}.demo.com/mobile/login.htm?sourceApp=8&target=http://a${machine}.demo.com/open/member/loginJump?logincallback=`,
    cache: 1 / 24, //1小时
    api: '/baseScreen/v1',
    boxApi: `//mip${machine}.demo.com`,
    assetsPath: debug ? `http://__localIP__:__localPORT__/${spaMode}/${spaDir}/` : `//static.demo.com/website/assets/subject/${spaMode}/${spaDir}/`,
    bizOrigin,
    activityCode,
    appconfig: {},
    share: {
        link: 'https://m.demo.com',
        title: '感恩一路有你，惊喜福利在后面',
        richTitle: '',
        desc: '奋不顾身的拼，不怕险阻；义无反顾的冲，不畏荆棘；歇斯底里的跑，只因为。。。。。。',
        imgUrl: 'https://m.demo.com/images/za.jpg'
    },
    appUrl: `https://static.demo.com/website/app/html/downLoadLink/build/html/index.html?channel=${bizOrigin}`,
    surfix: '',
    prefix: `za_${spaDir}_`,
    __daddy__: [
        { search: '__routerMode__', replace: { 'router.split==true': 'router-split', 'router.split==false': 'router-common' }, regexMode: 'ig' },
    ]
}