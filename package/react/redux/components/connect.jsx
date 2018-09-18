import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../redux/actions';

export default function Connect ( Component, keys ) {

    const mapStateToProps = state => {
        let o = {};
        if($.type(keys) === 'array') {
            // 如果keys为空数组把所有state都挂载到组件上
            if(keys.length === 0) {
                o = state;
            } else {
                keys.forEach(key=>{
                    if($.type(state[key]) !== 'undefined') {
                        o[key] = state[key];
                    }
                });
            }
        }
        return o;
    }
    
    const mapDispatchToProps = dispatch => (
        bindActionCreators(actions, dispatch)
    )

    return connect(mapStateToProps, mapDispatchToProps)(Component);
}