const sysinfo = 'server api crashed';

export default {
    shareConfig(me, cb) {
        // console.log(me.activityCode)
        //分享前置信息
        if (_zax.device.app || _zax.device.weixin) {
            let wxcb = {
                success: function (res) {},
                cancel: function (res) {
                    //_zax.ui.toast('cancel:' + JSON.stringify(res) + _zax.cookie.get('zaLoginCookieKey'));
                    //_zax.ui.confirm('如果收到，表示JS桥接cancel没问题');
                },
                complete: function (res) {
                    //_zax.ui.toast('complete:' + JSON.stringify(res) + _zax.cookie.get('zaLoginCookieKey'));
                    _zax.ui.mask.hide();
                    me.setWeixinMask(false);
                },
            };
            let params = $.extend({}, me.cfg.antifraud.tail, { activityCode: me.shareCode });
            $.ajax({
                url: '/baseScreen/getShareLink.json',
                type: 'POST',
                dataType: 'json',
                data: params,
            }).done((res) => {
                if (res && res.status == 1) {
                    window._za_share_config = {
                        link: res.link,
                        title: res.title,
                        richTitle: '',
                        desc: res.desc,
                        imgUrl: res.imgUrl,
                    }
                    console.log(window._za_share_config);
                }
                window._za_app_config = $.extend(window._za_share_config || {}, wxcb);
                window._za_share_config = $.extend(window._za_share_config || {}, wxcb);
                //Object.assign not support in lower android device
                cb && cb();
            }).fail((res) => {
                me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res);
            });
        }
    },
    userLogin(me, mobile, code, cb) {
        //通用登录
        let params = $.extend({}, me.cfg.antifraud.tail, { mobileNo: mobile, code });
        $.ajax({
            url: me.cfg.boxApi + '/otp/registerAndLogin',
            type: 'GET',
            dataType: 'jsonp',
            data: params,
        }).done((res) => {
            if (res) {
                if (res.isSuccess) {
                    me.setUserCode(_zax.cookie.get('zaLoginCookieKey'));
                    me.setPopStatus('login', false);
                    _zax.ui.toast("登录成功");
                    cb && cb();
                } else {
                    _zax.ui.toast(res.msg || res.message);
                }
            }
        }).fail((res) => {
            me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res);
        });
    },
    sendVerifyCode(me, mobile) {
        //获取验证码
        let params = $.extend({ mobileNo: mobile, }, me.cfg.antifraud.tail);
        $.ajax({
            url: me.cfg.boxApi + '/sms/sendSmsCode',
            type: 'GET',
            dataType: 'jsonp',
            data: params,
        }).done((res) => {
            if (res) {
                _zax.ui.toast(res.msg || res.message);
            }
        }).fail((res) => {
            me.cfg.debug ? _zax.ui.toast(sysinfo) : console.log(res);
        });
    },
}
