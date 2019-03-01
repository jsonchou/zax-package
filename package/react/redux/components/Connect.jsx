import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../redux/actions';

export default function Connect ( Component, keys ) {

    const mapStateToProps = state => {
        let o = state;
        if($.type(keys) === 'array') {
            if(keys.length === 0) {
                o = {};
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
