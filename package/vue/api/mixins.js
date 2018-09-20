import {
    mapGetters,
    mapActions
} from 'vuex'

import actions from "../vuex/actions";
import getters from "../vuex/getters";

export default {
    computed: {
        ...mapGetters(Object.keys(getters)),
    },
    methods: {
        ...mapActions(Object.keys(actions)),
        _shareSuccess() { // 分享成功回调
            let me = this;
        },
        async initShare() { // 初始化分享
            let me = this;

            if (_zax.device.weixin || _zax.device.app) {
                try {
                    const { value: cfg } = await me.service.shareConfig(me);
                    me.setShareInfo(cfg);
                    cfg.success = me._shareSuccess
                    me.Share.init(cfg);
                } catch(e) {
                    console.log('初始化分享失败:');
                    throw e;
                }
            }
        },
        onShare(e, shareInfoExt = {}) {
            //简单分享提示
            let me = this;
            let {
                shareInfo,
            } = me;

            let {
                tag
            } = e.currentTarget.dataset;
            tag && me.setPopStatus({
                [tag]: false
            }); // 点击分享关闭弹窗

            //close current pop
            _zax.ui.mask.hide();

            if (_zax.device.weixin) {
                //mask tip
                _zax.ui.mask.show(msk => {
                    me.setPopStatus({
                        'weixinmask': true
                    });
                    me.Share.init({
                        ...shareInfo,
                        success() {
                            me._shareSuccess();
                        },
                        ...shareInfoExt,
                    });
                });
            } else if (_zax.device.app) {
                me.Share.popView({
                    ...shareInfo,
                    success() {
                        me._shareSuccess();
                    },
                    ...shareInfoExt,
                });
            } else {
                _zax.ui.confirm("当前设备无法使用分享功能，请使用众安APP或微信打开当前页面");
            }
        },
        _wxQuietAuth() { // 微信自动疾静默授权
            let me = this;
            if (_zax.device.weixin) {
                let url = location.href;
                url = _util.url.set(url, 'channel', me.cfg.channelId);
                url = encodeURIComponent(url);
                let wxurl = `${me.cfg.wxQuietAuthApi}?url=${url}&env=${me.cfg.wxenv}`;
                location.href = wxurl;
            }
        },
        _wxAuth() {//微信界面手动授权
            let me = this;
            if (_zax.device.weixin) {
                let url = location.href;
                url = _util.url.set(url, 'channel', me.cfg.channelId);
                url = encodeURIComponent(url);
                let wxurl = `${me.cfg.wxAuthApi}?url=${url}&env=${me.cfg.wxenv}`;
                location.href = wxurl;
            }
        },
    },
    created() {
        let me = this;
        if (!me.cfg.bizOrigin) {
            if (me.cfg.debug && (location.href.indexOf('-uat') > -1 || location.href.indexOf('-test') > -1)) {
                //保险期间
                // _zax.ui.mask.show();
                _zax.ui.confirm(
                    '<h1 class="f35 lh2 mb10">前端免责声明</h1><p class="tl">1、请自行添加bizOrigin参数，注意参数大小写，有问题，请联系后端活动盒子配置。</p><p class="tl">2、因参数配置错误（参数大小写，apk包丢失，后台配置code不一致）产生的问题，由事故当事人负责。</p>'
                )
            }
        }
    },
}