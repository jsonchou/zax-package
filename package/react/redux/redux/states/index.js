export default {
    execLoginCallback: false, // 登陆是否成功,登陆成功之后可以通过该值来判断是否执行自定义逻辑代码
    pageName: '',
    userCode: '',
    popStatus: {
        login: false,
        weixinmask: false,
        rule: false,
        endMask: false,
    },
    shareInfo: { // 分享信息
        link: '',
        title: '',
        richTitle: '',
        desc: '',
        imgUrl: '',
    },
};