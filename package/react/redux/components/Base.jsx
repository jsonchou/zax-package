import React, { PureComponent } from 'react';
import connect from './connect';

class Base extends PureComponent {
    componentWillMount() {
        console.log('Base component will mount');
        // 引入ilog
        _zax.use(["ilog"], () => {
        });
        const token = _zax.cookie.get(this.cfg.token);
        token && this.props.setUserCode(token);

        //14分钟refershAccessKey
        setInterval(async () => {
            let ck = _zax.cookie.get(this.cfg.token);
            const { dmAccountTicket, dmNoRedirect } = this.storage.cookieNames;
            if (ck) {
                try {
                    let res = await this.service.refreshAccessKey.call();
                    if (res.code == 200) {
                        this.props.setUserCode(ck);
                    } else {
                        this.props.setUserCode("");
                        _zax.cookie.del(this.cfg.token);
                        _zax.cookie.del(dmAccountTicket);
                        _zax.cookie.del(dmNoRedirect);
                    }
                } catch(err) {
                    this.props.setUserCode("");
                    _zax.cookie.del(this.cfg.token);
                    _zax.cookie.del(dmAccountTicket);
                    _zax.cookie.del(dmNoRedirect);
                    console.warn('err', err);
                }
                
            }
        }, 1000 * 60 * 14);
    }
    
    render() {
        return [];
    }
}

export default connect(Base);