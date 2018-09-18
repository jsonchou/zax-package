import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

export default class Transition extends PureComponent {

    static defaultProps = {
        transitionName: 'transition'
    }

    node = null;
    cls = '';

    componentDidMount() {
        const { transitionName } = this.props;
        this.node = ReactDOM.findDOMNode(this);
        this.cls = this.node.getAttribute('class');
        this.node.setAttribute('class', `${this.cls} ${transitionName}-enter`);
    }

    render() {
        return (
            React.cloneElement(this.props.children)
        );
    }
}