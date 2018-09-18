const sysinfo = 'server api crashed';

export default {
    ajaxCommon(me, params = {
        url: '',
        method: 'GET',
        data: {},
    }) {
        return new Promise((resolve, reject) => {
            let data = Object.assign({}, me.cfg.antifraud.tail, params.data);
            $.ajax({
                url: params.url,
                type: params.type || params.method || 'GET',
                dataType: params.dataType || 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data,
            }).done((res) => {
                let {
                    code,
                } = res;
                if (res.isSuccess || res.success) {
                    resolve(res);
                } else if (code === 'C313' || code === 'C303' || code === 'C304') { // 活动已结束、下架
                    _zax.ui.toast(res.msg || res.message);
                    reject(res);
                } else {
                    res.message && _zax.ui.toast(res.message);
                    reject(res);
                }
            }).fail((res) => {
                me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res)
                reject(res);
            });
        })
    },
    shareConfig(me, cb) {
        //分享前置信息
        if (_zax.device.app || _zax.device.weixin) {
            let params = $.extend({}, me.cfg.antifraud.tail);

            $.ajax({
                url: me.cfg.boxApi + '/mgm/getShareInfo',
                type: 'POST',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: params,
            }).done((res) => {
                console.log('shareConfig data', res)
                if (res && res.value) {
                    me.props.setShareInfo(res.value);
                    cb && cb(res.value);
                }
            }).fail((res) => {
                me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res);
            });
        }
    },
    // 用户登陆
    userLogin(me, phone, smsCode) {
        let shareOrigin = _util.url.get('shareCode') || '';

        let params = Object.assign({}, {
            phone,
            smsCode,
            shareOrigin,
            ticket: _zax.cookie.get('dmAccountTicket') || '',
            channel: me.cfg.channelId,
        }, me.cfg.antifraud.tail);

        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/registerAndLogin',
            data: params,
            method: 'POST',
        });
    },
    // 刷新token
    refreshAccessKey(me) {
        let params = Object.assign({}, me.cfg.antifraud.tail);
        if (!_zax.cookie.get(me.cfg.token)) {
            return;
        }
        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/refreshAccessKey',
            data: params,
            method: 'POST',
        });
    },
    // 获取验证码
    getVerifyCode(me, phone) {
        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/sendSmsCode',
            method: 'POST',
            data: {
                phone
            }
        });
    },
}