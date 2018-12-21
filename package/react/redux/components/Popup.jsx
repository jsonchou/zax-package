import React, { Fragment, PureComponent } from 'react';
import Login from './Login/Login';
import WeixinMask from './WeixinMask/WeixinMask';
import Rule from './Rule/Rule';
import EndMask from './EndMask/EndMask';
import connect from './Connect';
import CSSTransition from './CssTransition';

class Popup extends PureComponent {

    onClose = (key) => {
        this.props.setPopStatus({
            [key]: false
        });
    }

    render() {
        const { popStatus = { } } = this.props;
        return (
            <Fragment>
                <CSSTransition
                    visible={popStatus.login}
                >
                    <Login
                        onClose={ ()=> { this.onClose('login') } } 
                    />
                </CSSTransition>
                <CSSTransition
                    visible={popStatus.weixinmask}
                    maskClassNames="opacity"
                    contentClassNames="opacity"
                >
                    <WeixinMask onClose={()=>{ this.onClose('weixinmask') }} />
                </CSSTransition>
                <CSSTransition
                    visible={popStatus.rule}
                >
                    <Rule onClose={()=>{ this.onClose('rule') }} />
                </CSSTransition>
                <CSSTransition
                    visible={popStatus.endMask}
                    maskClassNames="opacity"
                    contentClassNames="opacity"
                >
                    <EndMask onClose={()=>{ this.onClose('endMask') }} />
                </CSSTransition>
            </Fragment>
        );
    }
}

export default connect( Popup, [ 'popStatus' ] );