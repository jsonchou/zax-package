//import const param
import { STD_REQUEST, STD_RECEIVE, } from '../actions'
import { PAGE_NAME, USER_CODE, } from '../actions'
import { POP_STATUS, LOTTERY_INFO, } from '../actions'

const popStatus = (state = {
    'weixinmask': false,
    'login': false, //login pop box
    'rule': false, //总则
    'lottery': false, //优惠券 弹窗
}, action = {}) => {
    switch (action.type) {
        case POP_STATUS:
            return Object.assign({}, state, { [action.tag]: action.status });
        default:
            return state
    }
}

const pageName = (state = 'index', action = {}) => {
    switch (action.type) {
        case PAGE_NAME:
            return action.name
        default:
            return state;
    }
}

const userCode = (state = '', action = {}) => {
    switch (action.type) {
        case PAGE_NAME:
            return action.code
        default:
            return state;
    }
}

const lotteryInfo = (state = {
    'activityCode': "",
    'code': 0,
    'lotteryDetailId': 0,
    'message': "",
    'moduleDetailId': 0,
    'offerPackageProCode': "",
    'prizeCode': "",
    'prizeName': "",
    'result': "",
}, action = {}) => {
    switch (action.type) {
        case LOTTERY_INFO:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

export default {
    popStatus,
    pageName,
    userCode,
    lotteryInfo,
}