/** 警告
 ** 所有store变量名称，mutation-types必须严格遵守一一匹配格式
 **/

export default {
    pageName: null,
    userCode: null, // null,1, check user login status
    popStatus: {
        weixinmask: false,
        login: false,
        endMask: false,
    },
    shareInfo: { // 分享信息
        link: '', //暂未使用store=>shareInfo全局信息
        title: '',
        richTitle: '',
        desc: '',
        imgUrl: '',
    },
};