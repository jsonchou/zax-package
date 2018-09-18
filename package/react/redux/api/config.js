// base config
const machine = "-test1";
const machineBox = "-test1";
const debug = !!machine;

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
    wxQuietAuthApi: 'https://gwbk.zhongan.com/appapi/dm-account/wechat/quietauthorize', // 微信静默授权url
    wxAuthApi: 'https://gwbk.zhongan.com/appapi/dm-account/wechat/authorize', // 微信手动授权url
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
    machine,
    machineBox,
    travelUrl,
    domain: `//evt${machine}.zhongan.com`,
    bizOrigin: '',
    activityCode: '',
    channelId: 8,
    token: 'zaLoginCookieKey',
    gApi,
    boxApi: `//mip${machineBox}.zhongan.com`,
    wxApi: `//weixin.zhongan.com/weixin${debug ? '_dev' : ''}`,
    assetsPath: `//__spaAssets__/__spaMode__/__spaDir__/assets`,
    __daddy__: [{
        search: '__routerMode__',
        replace: {
            'router.split==true': 'router-split',
            'router.split==false': 'router-common'
        },
        regexMode: 'ig'
    }],

}