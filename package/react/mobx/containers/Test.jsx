import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

import BackToTop from '../components/common/BackToTop'

class Test extends Component {
    componentWillMount() {
        console.log('test page componentWillMount')
    }
    render() {
        return (
            <div className="test">
                <BackToTop actions={this.props.actions} />
                test page
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('test page mapStateToProps', state);
    return state
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(actions, dispatch)
    console.log('test page mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);

