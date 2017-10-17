const sysinfo = 'server api crashed';

export default {
    shareConfig(me, cb) {
        //分享前置信息
        if (_zax.device.app || _zax.device.weixin) {
            let wxcb = {
                success: function(res) {
                    //_zax.ui.confirm('如果收到，表示JS桥接success没问题');
                },
                cancel: function(res) {
                    //_zax.ui.toast('cancel:' + JSON.stringify(res) + _zax.cookie.get('zaLoginCookieKey'));
                    //_zax.ui.confirm('如果收到，表示JS桥接cancel没问题');
                },
                complete: function(res) {
                    //_zax.ui.toast('complete:' + JSON.stringify(res) + _zax.cookie.get('zaLoginCookieKey'));
                    _zax.ui.mask.hide();
                    me.setPopStatus('weixinmask', false);
                },
            };
            $.ajax({
                url: '/baseScreen/getShareLink.json',
                type: 'GET',
                dataType: 'json',
                data: {
                    afs_scene: $('#afs_scene').val(),
                    afs_token: $('#afs_token').val(),
                    activityCode: window.config.shareCode,
                },
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
                window.config.machine ? _zax.ui.toast(sysinfo) : console.log(res);
            });
        }
    },
    userLogin(me, mobile, code, cb) {
        //通用登录
        $.ajax({
            url: window.config.boxApi + '/otp/registerAndLogin',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                afs_scene: $('#afs_scene').val(),
                afs_token: $('#afs_token').val(),
                activityCode: window.config.activityCode,
                bizOrigin: window.config.bizOrigin,
                moduleKey: '',
                mobileNo: mobile,
                code: code,
            },
        }).done((res) => {
            if (res) {
                if (res.code == 200) {
                    me.setUserCode(_zax.cookie.get('zaLoginCookieKey'));
                    // me.setPopStatus('login', false);
                    me.setPopStatus('login', false);
                    me.setPopStatus('bind', false);
                    //_zax.ui.toast("登录成功");
                    cb && cb();
                } else {
                    _zax.ui.toast(res.msg || res.message);
                }
            }
        }).fail((res) => {
            window.config.machine ? _zax.ui.toast(sysinfo) : console.log(res);
        });
    },
    sendVerifyCode(me, mobile) {
        //获取验证码
        $.ajax({
            url: window.config.boxApi + '/sms/sendSmsCode',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                bizOrigin: window.config.bizOrigin,
                activityCode: window.config.activityCode,
                moduleKey: '',
                afs_scene: $('#afs_scene').val(),
                afs_token: $('#afs_token').val(),
                mobileNo: mobile,
            }
        }).done((res) => {
            if (res) {
                _zax.ui.toast(res.msg || res.message);
            }
        }).fail((res) => {
            window.config.machine ? _zax.ui.toast(sysinfo) : console.log(res);
        });
    },
}