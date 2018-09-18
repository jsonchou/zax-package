import React from 'react';
import Transiton from './transition';
import { createPortal } from 'react-dom';

export default class Portal extends React.Component {
    constructor() {
        super(...arguments);
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
        document.body.removeChild(this.node);
    }

    render() {
        return createPortal(
            <div className="md-popup">
                <Transiton 
                    transitionName="opacity"
                >
                    {<div className="md-popup_mask"></div>}
                </Transiton>
                <div className="md-popup_content">{ this.props.children }</div>
            </div>, //塞进传送门的JSX
            this.node //传送门的另一端DOM node
          );
    }
}