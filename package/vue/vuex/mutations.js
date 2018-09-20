import types from './mutation-types'
import util from '../api/util'

const mutations = {};

Object.keys(types).map(item => {
    mutations[item] = function (state, payload) {
        let storeKey = util.string.camelcase(item); //POP_STATUS=>popStatus
        let tar = state[storeKey]; //1

        if (item === 'POP_STATUS') {
            let vals = Object.keys(payload).reduce((v, k) => v.concat([payload[k]]), []);
            _zax.ui.mask[vals.indexOf(true) >= 0 ? 'show' : 'hide'](() => {
                Object.assign(tar, payload);
            });
        } else {
            if (Object.prototype.toString.call(payload) === '[object Object]') {
                Object.assign(tar, payload);
            } else {
                state[storeKey] = payload;
            }
        }

    }
})

export default mutations;