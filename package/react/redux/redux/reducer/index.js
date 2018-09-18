import { handleAction } from 'redux-actions';
import config from '../../api/config';
import storage from '../../api/storage';
import states from '../states';
import actions from '../actions';
import util from '../../api/util';
const { constantcase, camelcase } = util.string;

let reducer = {};

Object.keys(states).forEach(key=>{
    const camel = camelcase(`set_${constantcase(key)}`);
    reducer[key] = handleAction(actions[camel], ( state, action ) => {
        const { payload } = action;
        if($.type(payload) === 'object') {
            let popup = 'login';
            const inlogin = payload[popup];
            if ( _zax.device.app && inlogin ) {
                payload[popup] = false;
                //弹出app默认登录框，app拦截
                //强制返回时，继续拦截
                location.href = `https://login.zhongan.com/mobile/login.htm?sourceApp=8&v=${Date.now()}&target=${location.href}`
            }
            if( _zax.device.weixin && inlogin && !_zax.cookie.get(config.token) && !_zax.cookie.get(storage.cookieNames.dmAccountTicket) ) {
                _zax.ui.loading.show('跳转微信授权中...', 1000, ()=>{
                    let url = location.href;
                    url = util.url.set(url, 'channel', config.channelId);
                    url = encodeURIComponent(url);
                    location.href = `${config.wxAuthApi}?url=${url}&env=${config.wxenv}`;
                });
            }
            return { ...state, ...payload };
        } else {
            return payload;
        }
    }, states[key] );
});

export default reducer;

