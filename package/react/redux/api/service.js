const sysinfo = 'server api crashed';

const Service = {
    ajaxCommon(params = {
        url: '',
        method: 'GET',
        data: {},
    }) {
        return new Promise((resolve, reject) => {
            let data = Object.assign({}, this.cfg.antifraud.tail, params.data);
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
                this.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res)
                reject(res);
            });
        })
    },
    shareConfig() {
        //分享前置信息
        return Service.ajaxCommon.call( this, {
            url: this.cfg.boxApi + '/mgm/getShareInfo',
        });
    },
    // 用户登陆
    userLogin(phone, smsCode) {
        let shareOrigin = _util.url.get('shareCode') || '';

        let params = Object.assign({}, {
            phone,
            smsCode,
            shareOrigin,
            ticket: _zax.cookie.get('dmAccountTicket') || '',
            channel: this.cfg.channelId,
        });

        return Service.ajaxCommon.call( this, {
            url: this.cfg.gApi + '/dm-account/otp/registerAndLogin',
            data: params,
            method: 'POST',
        });
    },
    // 刷新token
    refreshAccessKey() {
        if (!_zax.cookie.get(this.cfg.token)) {
            return;
        }
        return Service.ajaxCommon.call( this, {
            url: this.cfg.gApi + '/dm-account/otp/refreshAccessKey',
            method: 'POST',
        });
    },
    // 获取验证码
    getVerifyCode(phone) {
        return Service.ajaxCommon.call( this, {
            url: this.cfg.gApi + '/dm-account/otp/sendSmsCode',
            method: 'POST',
            data: {
                phone
            }
        });
    },
}

export default Service;
