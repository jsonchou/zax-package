import React, { Fragment, PureComponent } from 'react';
import Base from './Base';
import Portal from './Portal';
import Login from './Login/Login';
import WeixinMask from './WeixinMask/WeixinMask';
import Rule from './Rule/Rule';
import EndMask from './EndMask/EndMask';
import Transition from './transition';
import connect from './connect';

class Popup extends PureComponent {

    handleClose = (key) => {
        this.props.setPopStatus({
            [key]: false
        });
    }

    render() {
        const { popStatus = { } } = this.props;
        return (
            <Fragment>
                {
                    popStatus.login &&
                    <Portal>
                        <Transition>
                            <Login
                                handleClose={ ()=> { this.handleClose('login') } } 
                            />
                        </Transition>
                    </Portal> 
                }
                {
                    popStatus.weixinmask &&
                    <Portal><WeixinMask handleClose={()=>{ this.handleClose('weixinmask') }} /></Portal> 
                }
                {
                    popStatus.rule &&
                    <Portal><Rule handleClose={()=>{ this.handleClose('rule') }} /></Portal>
                }
                {
                    popStatus.endMask &&
                    <Portal><EndMask handleClose={()=>{ this.handleClose('endMask') }} /></Portal> 
                }
            </Fragment>
                
        );
    }
}

export default connect( Popup, [ 'popStatus' ] );