import types from './mutation-types'
import util from '../api/util'
import config from '../api/config'
import storage from '../api/storage';

const actions = {};

Object.keys(types).map(item => {
    let camel = util.string.camelcase('set' + '_' + item);

    actions[camel] = function ({
        dispatch,
        commit
    }, payload) {

        if (item === 'PAGE_NAME') {
        } else if (item === 'POP_STATUS') {
            let keys = Object.keys(payload);
            let popup = 'login';
            let inStatus = keys.indexOf(popup) >= 0 && payload[popup]
            if (_zax.device.app && inStatus) {
                //弹出app默认登录框，app拦截
                //强制返回时，继续拦截
                location.href = `https://login.demo.com/mobile/login.htm?sourceApp=8&v=${Date.now()}&target=${location.href}`
                return;
            }
            else if (_zax.device.weixin && inStatus) {
                if (!_zax.cookie.get(storage.cookieNames.dmAccountTicket) && !_zax.cookie.get(config.token)) {
                    _zax.ui.loading.show('跳转微信授权中...', 1500, ()=>{
                        let url = location.href;
                        url = _util.url.set(url, 'channel', config.channelId);
                        url = encodeURIComponent(url);
                        let wxurl = `${config.wxAuthApi}?url=${url}&env=${config.wxenv}`;
                        location.href = wxurl;
                    });
                }
            }
        }

        commit(item, payload)

    }
});

export default actions;

// commit=>mutations,用来触发同步操作的方法。
// dispatch =>actions,用来触发异步操作的方法。