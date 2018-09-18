export default {
    _shareSuccess() { // 分享成功的回调
        console.log('分享成功');
    },
    initShare() { // 微信分享初始化
        if (_zax.device.weixin || _zax.device.app) {
            let me = this;
            me.service.shareConfig(me, cfg => {
                cfg.success = cfg._shareSuccess;
                me.Share.init(cfg);
            });
        }
    },
    onShare(e, shareInfoExt = {}) {
        // 简单分享提示
        let me = this;
        let {
            shareInfo,
        } = me.props;

        let {
            tag
        } = e.currentTarget.dataset;
        tag && me.props.setPopStatus({
            [tag]: false
        }); // 点击分享关闭弹窗

        if (_zax.device.weixin) {
            //mask tip
            me.Share.init({
                ...shareInfo,
                success() {
                    me._shareSuccess();
                },
                ...shareInfoExt,
            });
            me.props.setPopStatus({
                'weixinmask': true
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
    _wxQuietAuth() { // 微信自动寂静默授权
        let me = this;
        if (_zax.device.weixin) {
            let url = location.href;
            url = _util.url.set(url, 'channel', me.cfg.channelId);
            // url = encodeURIComponent(url.replace(/\#\//gi, ''));
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
            // url = encodeURIComponent(url.replace(/\#\//gi, ''));
            url = encodeURIComponent(url);
            let wxurl = `${me.cfg.wxAuthApi}?url=${url}&env=${me.cfg.wxenv}`;
            location.href = wxurl;
        }
    },
}