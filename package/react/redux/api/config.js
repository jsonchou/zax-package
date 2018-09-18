// base config
const machine = "-test1";
const machineBox = "-test1";
const debug = !!machine;
const spaMode = "__spaMode__"; //vue react
const spaDir = "__spaDir__";

let gApi = '';
let travelUrl = "";
if (machineBox.indexOf('-test') > -1) {
    gApi = `https://mgw-daily.zhongan.com/appapi`;
    travelUrl = `https://travel-dev.zhongan.com`;
} else if (machineBox === '-uat') {
    gApi = `https://gwbk-uat.zhongan.com/appapi`;
    travelUrl = `https://travel-uat.zhongan.com`;
} else {
    gApi = `https://gwbk.zhongan.com/appapi`;
    travelUrl = `https://travel.zhongan.com`;
}

let env = '';
if(machine.includes('test')) {
    env = 'test';
} else if(machine.includes('uat')) {
    env = 'uat';
} else {
    env = '';
}

// https://wiki.zhonganonline.com/pages/viewpage.action?pageId=21396917

module.exports = {
    manual: false,//手动，自动，默认自动（从_base/tmpl覆盖到开启的工程里面）
    wxenv: env,
    wxQuietAuthApi: 'https://gwbk.zhongan.com/appapi/dm-account/wechat/quietauthorize',
    wxAuthApi: 'https://gwbk.zhongan.com/appapi/dm-account/wechat/authorize',
    debug,
    antifraud: {
        provider: 'seraph', //seraph,pointman,3rd
        tail: {}
    },
    router: {
        split: false, //是否使用路由方式代码分割，超过10条路由，建议采用，默认为false
        mode: 'hash', //当前构建环境（单webpack多spa）不能很好支持browser模式，（单webpack单spa）比较适合browser模式（修改路由path层级+Nginx伪静态路由配置部署）
    },
    biz: {
        //业务配置文件
        title: '',
    },
    vue: {
        prefix: 'biz',
    },
    device: 'm',
    machine,
    machineBox,
    travelUrl,
    domain: `//evt${machine}.zhongan.com`,
    bizOrigin: '',
    activityCode: '',
    channelId: 8,
    shareCode: '',
    token: 'zaLoginCookieKey',
    gApi,
    loginUrl: `https://login${machine}.zhongan.com/mobile/login.htm?sourceApp=8&target=http://a${machine}.zhongan.com/open/member/loginJump?logincallback=`,
    appUrl: 'https://static.zhongan.com/website/app/html/downLoadLink/build/html/index.html?channel=',
    jifenmall: 'https://staticdaily.zhongan.com/website/assets/subject/react/jifenmall/index.html',
    myReward: 'zaapp://zai.my.reward',
    api: `/shailiuhai`,
    boxApi: `//mip${machineBox}.zhongan.com`,
    wxApi: `//weixin.zhongan.com/weixin${debug ? '_dev' : ''}`,
    assetsPath: `//__spaAssets__/__spaMode__/__spaDir__/assets`,
    zaapp: {
        wallet: 'zaapp://zai.wallet?', //钱包
        scorelist: 'zaapp://zai.scorelist?', //列表
        coupon: `https://static${debug ? 'daily' : ''}.zhongan.com/website/mobile/dm-h5/coupon/index.html#/myCouponList`,
    },
    appconfig: {},
    share: {
        link: 'https://m.zhongan.com',
        title: '请配置活动盒子分享信息',
        desc: '如果活动涉及到下载，bizOrigin上面的apk包，也别忘了，这个特别容易忘记。',
        imgUrl: 'https://static.zhongan.com/upload/online/material/1486983671839.png',
    },
    surfix: '',
    prefix: `za_${spaMode}_${spaDir}_`,
    __daddy__: [{
        search: '__routerMode__',
        replace: {
            'router.split==true': 'router-split',
            'router.split==false': 'router-common'
        },
        regexMode: 'ig'
    }],

}