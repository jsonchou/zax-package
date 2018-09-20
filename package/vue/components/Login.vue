<template>
    <!-- 登录弹窗 -->
    <transition name="slide">
        <div class="md-popup md-popup-login" v-if="popStatus.login">
            <i class="pop-close" @click="onClose"></i>
            <h2>登录</h2>
            <form>
                <ul>
                    <li>
                        <input type="tel" name="mobile" v-model="mobile" autocomplete="off" class="textbox" maxlength="11"
                            placeholder="输入手机号">
                    </li>
                    <li>
                        <input type="tel" name="verifycode" v-model="verifycode" maxlength="6" class="textbox" placeholder="输入验证码">
                        <span class="get-captcha tc f26" :class="ticker.indexOf('s')>-1?'send-fade':'' " @click="onGetVerifyCode">{{ticker}}</span>
                    </li>
                </ul>
                <p @click="onLogin">
                    <span class="f32">立即登录</span>
                </p>
            </form>
        </div>
    </transition>
</template>

<script>
    import mixins from "../api/mixins";

    export default {
        data() {
            return {
                mobile: '', //手机号
                ticker: '获取验证码',
                verifycode: '',
            }
        },
        mixins: [ mixins ],
        watch: {
            ['popStatus.login'](nv, ov) {
                let me = this;

                // 修复ios11弹出输入框bug
                if (_zax.device.iphone && _ua.match(/iphone os 11/i) == "iphone os 11") {
                    let body = $('body');
                    let scrollTop = 0;

                    if (nv) {
                        scrollTop = $(document).scrollTop();
                        body.css('top', -scrollTop);
                        body.addClass('body-fix');
                    } else {
                        body.removeClass('body-fix');
                        body.css('top', '0');
                        $(document).scrollTop(scrollTop);
                    }
                }
            }
        },
        methods: {
            async onLogin() {
                let me = this;
                let mobile = me.mobile;
                let verifycode = me.verifycode;

                if (!mobile) {
                    _zax.ui.toast('请填写手机号');
                    return;
                } else if (!_zax.regexForm.mobile(mobile)) {
                    _zax.ui.toast('请填写正确的手机号');
                    return;
                } else if (!verifycode) {
                    _zax.ui.toast('请填写短信验证码');
                    return;
                }
                _zax.ui.loading.show('',10000);
                try {
                    const res = await me.service.userLogin(me, mobile, verifycode);
                    me.setUserCode(_zax.cookie.get(me.cfg.token));
                    me.setPopStatus({
                        login: false
                    });
                    _zax.ui.toast('登录成功');
                } catch (err) {
                    _zax.ui.toast(err.message || 'server api crashed');
                }
                _zax.ui.loading.hide();
            },
            onGetVerifyCode(e) {
                //发送验证码
                let me = this;
                const { mobile } = me;

                if (!mobile) {
                    _zax.ui.toast('请填写手机号');
                    return;
                } else if (!_zax.regexForm.mobile(mobile)) {
                    _zax.ui.toast('请填写正确的手机号');
                    return;
                } else {
                    if (me.ticker != '获取验证码') {
                        return;
                    } else {
                        me.ticker = '60 s';
                        me.service.sendVerifyCode(me, mobile);
                        let myticker = setInterval(() => {
                            let tck = parseInt(me.ticker.replace(' s', ''));
                            if (tck > 0) {
                                me.ticker = ((tck - 1) + ' s');
                            } else {
                                clearInterval(myticker);
                                me.ticker = '获取验证码';
                            }
                        }, 1000);
                    }
                }
            },
            onClose() {
                let me = this;
                me.setPopStatus({
                    login: false
                });
            }
        },
        created() {
            let me = this;
            if (me.cfg.machine.indexOf('test') > -1) {
                me.mobile = '15618551510';
                me.verifycode = '999999';
            }
        },
        mounted() {
            let me = this;
        },
        beforeDestroy() {
            let me = this;
        }

    }
</script>

<style lang="scss" scoped>
    .md-popup-login {
        height: 5.1rem;
        background-color: #fff;
        border-radius: r(8);
        overflow: hidden;
        z-index: 999;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: r(600);
    }
    .pop-close {
        position: absolute;
        right: r(30);
        top: r(30);
        z-index: 5;
        width: r(50);
        height: r(50);
        overflow: hidden;
        &:before, &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            border-top: r(2) solid #979797;
            width: r(40);
            overflow: hidden;
        }
        &:before {
            transform: translateX(-50%) rotate(135deg);
        }
        &:after {
            transform: translateX(-50%) rotate(45deg);
        }
    }
    h2 {
        font-size: r(34);
        font-weight: 700;
        text-align: center;
        margin-top: r(35);
    }
    ul {
        margin: r(20) r(50) 0;
    }
    li {
        position: relative;
        input {
            box-sizing: border-box;
            padding: r(34) r(40) r(34) 0;
            border: none;
            width: 100%;
            height: r(110);
            font-size: r(28);
            color: #000;
        }
        span {
            position: absolute;
            width: r(158);
            height: r(43);
            text-align: center;
            line-height: r(43);
            font-size: r(24);
            color: #13c8a1;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    p {
        width: r(520);
        height: r(88);
        line-height: r(88);
        border-radius: r(8);
        background-color: #12c8a2;
        text-align: center;
        color: #fff;
        margin: r(50) auto 0;
    }
</style>