import React, { Component } from 'react';
import PropTypes from 'prop-types';

const tag = 'login';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticker: '获取验证码',
            verifycode: '',
            mobile: '13472792921',
        }
        this.onLogin = this.onLogin.bind(this)
        this.onGetVerifyCode = this.onGetVerifyCode.bind(this)
        this.onInput = this.onInput.bind(this)
        this.onClose = this.onClose.bind(this)
    }
    onLogin() {
        let { mobile, verifycode, ticker } = this.state;

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

        window.service.userLogin(me, mobile, verifycode, () => {

        });
    }
    onGetVerifyCode(e) {
        let me = this;

        //发送验证码
        let { mobile, verifycode, ticker } = this.state;

        if (!mobile) {
            _zax.ui.toast('请填写手机号');
            return;
        } else if (!_zax.regexForm.mobile(mobile)) {
            _zax.ui.toast('请填写正确的手机号');
            return;
        } else {
            if (ticker != '获取验证码') {
                return;
            } else {
                this.setState({ ticker: '60 s' });
                window.service.sendVerifyCode(me, mobile);
                let myticker = setInterval(() => {
                    let { ticker } = this.state;
                    let tck = parseInt(ticker.replace(' s', ''));
                    if (tck > 0) {
                        this.setState({ ticker: ((tck - 1) + ' s') });
                    } else {
                        clearInterval(myticker);
                        this.setState({ ticker: '获取验证码' })
                    }
                }, 1000);
            }
        }

    }
    onInput(e) {
        let me = this;
        let { name } = e.target.dataset;
        let val = e.target.value;
        this.setState({
            [name]: val
        })
    }
    onClose(e) {
        let { setPopStatus } = this.props.actions;
        console.log(tag + ' tmpl onClose', this.props)
        setPopStatus(tag, false);
    }
    componentWillMount() {
        console.log(tag + ' tmpl componentWillMount');
    }
    render() {
        console.log(tag + ' tmpl render log')
        let { ticker, verifycode, mobile, } = this.state;
        let { popStatus } = this.props;
        console.log(tag + ' tmpl state', this.state);
        console.log(tag + ' tmpl props', this.props);
        return (
            <div className="template-login f30">
                <div className={`md-popup md-popup-login ${popStatus[tag] ? 'on' : ''}`}  >
                    <i className="popup-close f30 p20" onClick={this.onClose}>关闭&times;</i>
                    <h3 className="popup-hd tc f36 b">输入手机号领福利</h3>
                    <form id="j_getCouponForm">
                        <menu className="info-list">
                            <li className="list-item"><input type="tel" defaultValue={this.state.mobile} name="mobile" data-name="mobile" onChange={this.onInput} autoComplete="off" className="textbox f30" maxLength="11" placeholder="输入手机号" /></li>
                            <li className="list-item">
                                <input type="tel" name="verifycode" data-name="verifycode" onChange={this.onInput} maxLength="6" className="textbox f30" placeholder="输入验证码" />
                                <span className={`get-captcha tc f26 ${ticker.indexOf('s') > -1 ? 'send-fade' : ''}`} onClick={this.onGetVerifyCode}>{ticker}</span>
                            </li>
                        </menu>
                        <p className="btn-bar tc"><input type="button" data-tag="login" onClick={this.onLogin} value="立即前往" className="btn-buy f32 b" /></p>
                    </form>
                </div>
            </div>
        )
    }
    componentDidMount() {
        console.log(tag + ' tmpl componentDidMount');
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(tag + ' tmpl componentWillReceiveProps ', nextProps)
    // }
    shouldComponentUpdate(nextProps, newStates) {
        return nextProps.popStatus[tag] != this.props.popStatus[tag];
    }

}

Login.propTyps = {
    popStatus: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

// React.propTypes has deprecated in 16.0