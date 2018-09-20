import types from './mutation-types'
import util from '../api/util'

const getters = {};

Object.keys(types).map(item => {
    let camel = util.string.camelcase(item);
    getters[camel] = function (state) {
        return state[camel];
    }
})

export default getters;
