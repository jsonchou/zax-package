import React, { Component } from 'react'
import PropTypes from 'prop-types';

const tag = 'weixinmask';

class WeixinMask extends Component {
    constructor(props) {
        super(props)
        this.onClose = this.onClose.bind(this)
    }
    onClose(e) {
        let { setPopStatus } = this.props.actions;
        console.log(tag + ' tmpl onClose', this.props)
        setPopStatus(tag, false);
    }
    componentWillMount() {
        let { popStatus } = this.props;
        popStatus[tag] === true && _zax.ui.mask.show();
    }
    render() {
        let { popStatus } = this.props;
        let { setPopStatus, } = this.props.actions;
        console.log(tag + ' tmpl render log')
        return (
            <div className="template-weixinmask" onClick={this.onClose} >
                <div className={`md-weixinmask ${popStatus[tag] ? 'on' : ''}`}>
                    <img src="//static.demo.com/website/assets/subject/vue/20161221/assets/images/weixin-mask.png" alt="" />
                </div>
            </div>
        )
    }
    shouldComponentUpdate(nextProps, newStates) {
        return nextProps.popStatus[tag] != this.props.popStatus[tag];
    }
    componentWillUnmount(){
        console.log(tag + ' tmpl componentWillUnmount')
        _zax.ui.mask.hide()
    }
}

WeixinMask.propTyps = {
    popStatus: PropTypes.object.isRequired,
    actions: PropTypes.func.isRequired
}

export default WeixinMask