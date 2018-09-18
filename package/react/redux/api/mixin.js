export default {
    _shareSuccess() { // 分享成功的回调
        console.log('分享成功');
    },
    async initShare() { // 微信分享初始化
        if (_zax.device.weixin || _zax.device.app) {
            try {
                let { value: cfg } = await this.service.shareConfig.call(this);
                this.props.setShareInfo(cfg);
                cfg.success = this._shareSuccess;
                this.Share.init(cfg);
            } catch(e) {
                console.error('初始化分享失败:' , e );
            }
        }
    },
    onShare(e, shareInfoExt = {}) {
        // 简单分享提示
        let {
            shareInfo,
        } = this.props;

        let {
            tag
        } = e.currentTarget.dataset;
        tag && this.props.setPopStatus({
            [tag]: false
        }); // 点击分享关闭弹窗

        if (_zax.device.weixin) {
            //mask tip
            this.Share.init({
                ...shareInfo,
                success() {
                    this._shareSuccess();
                },
                ...shareInfoExt,
            });
            this.props.setPopStatus({
                'weixinmask': true
            });
        } else if (_zax.device.app) {
            this.Share.popView({
                ...shareInfo,
                success() {
                    this._shareSuccess();
                },
                ...shareInfoExt,
            });
        } else {
            _zax.ui.confirm("当前设备无法使用分享功能，请使用众安APP或微信打开当前页面");
        }
    },
    _wxQuietAuth() { // 微信自动寂静默授权
        if (_zax.device.weixin) {
            let url = location.href;
            url = _util.url.set(url, 'channel', this.cfg.channelId);
            url = encodeURIComponent(url);
            let wxurl = `${this.cfg.wxQuietAuthApi}?url=${url}&env=${this.cfg.wxenv}`;
            location.href = wxurl;
        }
    },
    _wxAuth() {//微信界面手动授权
        if (_zax.device.weixin) {
            let url = location.href;
            url = _util.url.set(url, 'channel', this.cfg.channelId);
            url = encodeURIComponent(url);
            let wxurl = `${this.cfg.wxAuthApi}?url=${url}&env=${this.cfg.wxenv}`;
            location.href = wxurl;
        }
    },
}
