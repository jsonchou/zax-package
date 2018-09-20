//change camel way to uppercase constant way

import util from '../api/util'
import state from './state'

let constants = {
}

Object.keys(state).map(item => {
    let cnt = util.string.constantcase(item);
    constants[cnt] = cnt;
})

// console.log('constants', constants)

export default constants;