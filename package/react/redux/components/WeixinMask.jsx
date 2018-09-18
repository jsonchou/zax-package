import React, { PureComponent } from 'react';
import connect from './connect';

class WeixinMask extends PureComponent {
    render() {
        return (
            <div className="md-popup_weixinmask" onClick={this.props.handleClose}>
                <img src={`${this.cfg.assetsPath}/images/weixinmask.png`} />
            </div>
        );
    }
}

export default connect(WeixinMask);