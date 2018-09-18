import React, { PureComponent } from 'react';
import connect from './connect';

class Base extends PureComponent {
    componentWillMount() {
        console.log('Base component will mount');
        let me = this;
        // 引入ilog
        _zax.use(["ilog"], () => {
        });
        const token = _zax.cookie.get(me.cfg.token);
        token && me.props.setUserCode(token);

        //14分钟refershAccessKey
        setInterval(async () => {
            let ck = _zax.cookie.get(me.cfg.token);
            const { dmAccountTicket, dmNoRedirect } = me.storage.cookieNames;
            if (ck) {
                try {
                    let res = await me.service.refreshAccessKey(me)
                    if (res.code == 200) {
                        me.props.setUserCode(ck);
                    } else {
                        me.props.setUserCode("");
                        _zax.cookie.del(me.cfg.token);
                        _zax.cookie.del(dmAccountTicket);
                        _zax.cookie.del(dmNoRedirect);
                    }
                } catch(err) {
                    me.props.setUserCode("");
                    _zax.cookie.del(me.cfg.token);
                    _zax.cookie.del(dmAccountTicket);
                    _zax.cookie.del(dmNoRedirect);
                    console.warn('err', err);
                }
                
            }
        }, 1000 * 60 * 14);
    }

    componentDidMount() {
        console.log('Base component did mount');
    }
    
    render() {
        return [];
    }
}

export default connect(Base);