import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group';

export default class CssTransition extends PureComponent {

    static defaultProps = {
        visible: false,
        maskClassNames: 'opacity',
        contentClassNames: 'slide'
    }
    
    render() {

        const { visible, maskClassNames, contentClassNames } = this.props;

        return (
            <CSSTransition
                in={visible}
                timeout={visible ? 10 : 1000}
                unmountOnExit
                classNames=""
                component="div"
            >
                {
                    state => {
                        return (
                            <div className="md-popup">
                                <CSSTransition
                                    in={state === 'entered'}
                                    timeout={visible ? 10 : 1000}
                                    unmountOnExit
                                    classNames={maskClassNames}
                                    component="div"
                                >
                                    <div className="md-popup_mask"></div>
                                </CSSTransition>
                                <div className="md-popup_content">
                                    <CSSTransition
                                        in={state === 'entered'}
                                        timeout={visible ? 10 : 1000}
                                        unmountOnExit
                                        classNames={contentClassNames}
                                        component="div"
                                    >
                                        {this.props.children}
                                    </CSSTransition>
                                </div>
                            </div>
                        );
                    }
                }
            </CSSTransition>
        );
    }
}