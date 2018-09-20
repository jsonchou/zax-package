import React, { PureComponent } from 'react';
import './EndMask.scss';

export default class EndMask extends PureComponent {
    render() {
        return (
            <div className="md-popup_endmask">
                <p className="tc f28">Sorry!<br />来晚了一步，活动已结束。</p>
            </div>
        );
    }
}