import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

alert('测试代码分割');

class Topic extends Component {
    componentWillMount() {
        console.log('topic page componentWillMount')
    }
    render() {
        return (
            <div className="topic">
                topic page
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Topic);

