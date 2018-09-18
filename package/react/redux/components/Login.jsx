import React, { PureComponent } from 'react';
import connect from './connect';

class Login extends PureComponent {

    state = {
        ticker: '获取验证码',
        phone: '',
        code: '',
    }

    iv = null;
    loging = false; // 是否点击了登陆按钮并且登陆数据还未返回

    componentDidMount() {
        let me = this;
        if (me.cfg.machine.indexOf('test') > -1) {
            me.setState({
                phone: '13472792921',
                code: '999999'
            });
        }
    }

    componentWillUnmount() {
        // 组件卸载之前清除定时器
        if(this.iv) clearInterval(this.iv);
    }

    // 输入框change事件
    handleChange = (e, key) => {
        let { value } = e.target;
        if(key === 'phone') {
            if(!/\d/.test(value.slice(-1))) {
                value = value.slice(0, -1);
            }
        }
        this.setState({
            [key]: value
        });
    }

    // 点击获取验证码
    handleGetCode = () => {
        let me = this;
        let { ticker } = me.state;
        if( !ticker.includes('s') && me.verify(['phone']) ) {
            me.setState({
                ticker: '60 s'
            }, async () => {
                let { ticker } = me.state;
                // 开始倒计时
                this.iv = setInterval(()=>{
                    const tk = parseInt(ticker.replace(' s', ''));
                    if(tk > 0) {
                        ticker = `${tk - 1} s`;
                    } else {
                        ticker = '获取验证码'
                        clearInterval(this.iv);
                    }
                    me.setState({
                        ticker
                    });
                }, 1000);
                // 发送验证码
                try {
                    const res = await me.service.getVerifyCode(me, me.state.phone);
                    console.log(res);
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }

    // 点击登录
    handleLogin = async () => {
        let me = this;
        if( me.verify(['phone', 'code']) ) {

            if(me.loging) {
                return ;
            }
            _zax.ui.loading.show( '登录中...', 10000 );
            me.loging = true;

            const { phone, code } = this.state; 
            let o = {};
            try {
                const res = await me.service.userLogin(me, phone, code);
                o = res.value;
            } catch(e) {
                // console.log(e);
            }

            _zax.ui.loading.hide();
            me.loging = false;

            if(Object.keys(o).length > 0) {
                const { setUserCode, setPopStatus, setExecLoginCallback } = me.props;
                setUserCode(o.token || '');
                setPopStatus({
                    login: false
                });
                setExecLoginCallback(true);
                _zax.ui.toast('登录成功');
            }
        }
    }

    verify(keys) {
        const { phone, code } = this.state;
        if(keys.includes('phone')) {
            if(!phone) {
                _zax.ui.toast('请填写手机号');
                return false;
            } else if (!_zax.regexForm.mobile(phone)) {
                _zax.ui.toast('请填写正确的手机号');
                return false;
            }
        }
        if(keys.includes('code')) {
            if(!code) {
                _zax.ui.toast('请填写短信验证码');
                return false;
            }
        }
        return true;
    }

    render() {
        const { handleClose } = this.props; 
        const { phone, code, ticker } = this.state;

        return (
            <div id="login" className="md-popup_login">
                <i className="md-popup_close" onClick={ handleClose }>
                </i>
                <h2>登录</h2>
                <form className="md-popup_login_form">
                    <ul>
                        <li>
                            <input
                                value={phone} 
                                onChange={(e) => { this.handleChange(e, 'phone') }} 
                                type="tel" 
                                name="mobile" 
                                autoComplete="off" 
                                maxLength="11" 
                                placeholder="输入手机号" 
                            />
                        </li> 
                        <li>
                            <input 
                                value={code}
                                onChange={(e) => { this.handleChange(e, 'code') }} 
                                type="tel"
                                name="verifycode"
                                maxLength="6"
                                placeholder="输入验证码" 
                            />
                            <span className="get-captch tc f26" onClick={this.handleGetCode}>{ ticker }</span>
                        </li>
                    </ul>
                    <a onClick={this.handleLogin} className="f32">立即登录</a>
                </form>
            </div>
        );
    }
}

export default connect(Login);