import fetch from 'isomorphic-fetch'

export const STD_REQUEST = 'STD_REQUEST';
export const STD_RECEIVE = "STD_RECEIVE";

export const PAGE_NAME = 'PAGE_NAME';
export const USER_CODE = "USER_CODE";

export const POP_STATUS = 'POP_STATUS';
export const LOTTERY_INFO = "LOTTERY_INFO";


//标准请求
const stdRequest = ajaxParams => {
    return {
        type: STD_REQUEST,
        ajaxParams,
    }
}

//标准接收
const stdReceive = (data) => {
    return {
        type: STD_RECEIVE,
        data,
    }
}

// credentials ={omit,same-origin,include}
// Content-Type:{application/x-www-form-urlencoded |application/json}

//标准获取数据
export const fetchData = ajaxParams => {
    let { url, method = "POST", body, headers = { "Content-Type": "application/json" }, cache = false, mode = 'cors', credentials = "include" } = ajaxParams;
    if (body && typeof body === 'object') {
        body = Object.keys(body).map(c => `${c}=${body[c]}`).join('&');
    }
    return dispatch => {
        dispatch(requestPosts(stdRequest));
        return fetch(url, {
            method,
            mode,
            body,
            headers,
            credentials,
            cache
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(stdReceive(data))
                })
            } else {
                console.log("status", response.status);
            }
        }).catch(info => {
            console.log(info);
        })
    }
}

//标准弹窗
export const setPopStatus = (tag, status) => {

    if (_zax.device.app && tag == 'login' && status) {
        location.href = "https://login.demo.com/mobile/login.htm?sourceApp=8&target=" + location.href;
        return;
    }

    return {
        type: POP_STATUS,
        tag,
        status
    }
}

//修改用户状态
export const setUserCode = code => {
    return {
        type: USER_CODE,
        code,
    }
}

//修改pageName
export const setPageName = name => {
    return {
        type: PAGE_NAME,
        name,
    }
}

//修改pageName
export const setLotteryInfo = info => {
    return {
        type: LOTTERY_INFO,
        info,
    }
}
