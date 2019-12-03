// base config
const machine = "-uat";
const machineBox = "-uat";
const debug = !!machine;

let gApi = '';
let travelUrl = "";
if (machineBox.indexOf('-test') > -1) {
    gApi = `https://mgw-daily.demo.com/appapi`;
    travelUrl = `https://travel-dev.demo.com`;
} else if (machineBox === '-uat') {
    gApi = `https://gwbk-uat.demo.com/appapi`;
    travelUrl = `https://travel-uat.demo.com`;
} else {
    gApi = `https://gwbk.demo.com/appapi`;
    travelUrl = `https://travel.demo.com`;
}

let env = '';
if(machine.includes('test')) {
    env = 'test';
} else if(machine.includes('uat')) {
    env = 'uat';
} else {
    env = '';
}

// https://wiki.demo.com/pages/viewpage.action?pageId=21396917

module.exports = {
    ftp: true, // 是否通过脚本上传html文件(true 上传 false 不上传)
    manual: false,//手动，自动，默认自动（从_base/tmpl覆盖到开启的工程里面）
    wxenv: env,
    wxQuietAuthApi: 'https://gwbk.demo.com/appapi/dm-account/wechat/quietauthorize', // 微信静默授权url
    wxAuthApi: 'https://gwbk.demo.com/appapi/dm-account/wechat/authorize', // 微信手动授权url
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
    domain: `//evt${machine}.demo.com`,
    bizOrigin: '',
    activityCode: '',
    channelId: 8,
    token: 'zaLoginCookieKey',
    loginUrl: `https://login${machine}.demo.com/mobile/login.htm?sourceApp=8&target=http://a${machine}.demo.com/open/member/loginJump?logincallback=`,
    appUrl: 'https://static.demo.com/website/app/html/downLoadLink/build/html/index.html?channel=',
    gApi,
    boxApi: `//mip${machineBox}.demo.com`,
    wxApi: `//weixin.demo.com/weixin${debug ? '_dev' : ''}`,
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