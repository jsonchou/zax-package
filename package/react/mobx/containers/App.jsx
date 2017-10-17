import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

// base component
import BackToTop from '../components/common/BackToTop'
import WeixinMask from '../components/common/WeixinMask'
import Login from '../components/common/Login'
import Rule from '../components/common/Rule'

// 路由根目录组件

class App extends Component {
    componentWillMount() {
        console.log('app page componentWillMount', this.props.children);
    }
    render() {
        console.log('app page render');
        return (
            <div className="root">

                {/* base component */}
                {/* <BackToTop actions={this.props.actions} /> */}
                <WeixinMask popStatus={this.props.popStatus} actions={this.props.actions} />
                <Login popStatus={this.props.popStatus} actions={this.props.actions} />
                <Rule popStatus={this.props.popStatus} actions={this.props.actions} />

                <div className="main">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>


            </div>
        )
    }
    componentDidMount() {
        console.log('app page componentDidMount', this);
    }
    componentWillReceiveProps(nextProps) {
        console.log('app page componentWillReceiveProps ', nextProps)
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('app page shouldComponentUpdate ', nextProps, nextState)
    //     return false;
    // }
}

const mapStateToProps = (state) => {
    console.log('app page mapStateToProps', state);
    return state
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(actions, dispatch)
    console.log('app page mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

