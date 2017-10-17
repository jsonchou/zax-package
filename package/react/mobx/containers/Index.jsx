
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

// cms component
import CMS from '../components/common/CMS'

const spaDir = "__spaDir__";

/**
 * (导出组件)
 * 
 * @export
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
    constructor(props) {
        console.log('home page constructor props', props)
        super(props);
        this.state = {

        }
        this.onPop = this.onPop.bind(this)
        this.onSkip = this.onSkip.bind(this)
    }
    onPop(e) {

        let { tag } = e.target.dataset;

        console.log('home page constructor props onPop', this)

        let { setPopStatus } = this.props.actions;

        setPopStatus(tag, true);
    }
    onSkip(e) {
        let { history } = this.props;
        history.push('topic')
    }
    componentWillMount() {
        
    }
    render() {

        console.log('home page render');

        return (
            <div className="container-index p20">

                <CMS dataSource={[]} />

                <div className="p10 f30" data-tag="rule" onClick={this.onPop}>查看规则</div>
                <div className="p10 f30" data-tag="login" onClick={this.onPop}>登录</div>
                <div className="p10 f30" data-tag="weixinmask" onClick={this.onPop}>弹出微信遮罩层</div>
                <Link className="p10 f30" to="/topic" >路由跳转Link1</Link>
                <div className="p10 f30" onClick={this.onSkip}>路由跳转Event1</div>
                <Link className="p10 f30" to="/test" >路由跳转Link2</Link>

            </div >
        );
    }
    componentDidMount() {
        console.log('home page componentDidMount');
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
}

const mapStateToProps = (state) => {
    console.log('home page mapStateToProps', state);
    return state
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(actions, dispatch)
    console.log('home page mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
