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
                    reject(res);
                }
            }).fail((res) => {
                me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res)
                reject(res);
            });
        })
    },
    shareConfig(me) {
        //分享前置信息
        let data = {
            activityCode: me.cfg.activityCode,
        };
        return this.ajaxCommon(me, {
            url: me.cfg.boxApi + '/mgm/getShareInfo',
            data,
        });
    },
    // 用户登录
    userLogin(me, phone, smsCode) {
        let params = Object.assign({}, {
            phone,
            smsCode,
            shareOrigin: _util.url.get('shareCode') || '',
            ticket: _zax.cookie.get('dmAccountTicket'),
            channel: me.cfg.channelId,
        });
        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/registerAndLogin',
            data: params,
            method: 'POST',
        });
    },
    // // 刷新token
    refreshAccessKey(me) {
        if (!_zax.cookie.get(me.cfg.token)) {
            return;
        }
        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/refreshAccessKey',
            method: 'POST',
        });
    },
    //获取验证码
    sendVerifyCode(me, phone) {
        //获取验证码
        return this.ajaxCommon(me, {
            url: me.cfg.gApi + '/dm-account/otp/sendSmsCode',
            method: 'POST',
            data: {
                phone
            }
        });
    },
}