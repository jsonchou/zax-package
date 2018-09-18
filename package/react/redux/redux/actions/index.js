import { createAction } from 'redux-actions';
import states from '../states';
import util from '../../api/util';
const { constantcase, camelcase } = util.string;

let actions = {};

Object.keys(states).forEach(key=>{
    const camel = camelcase(`set_${constantcase(key)}`);
    actions[camel] = createAction(camel.toUpperCase());
});

export default actions;