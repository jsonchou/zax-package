import React, { Fragment } from 'react';
import Base from './Base';
import Portal from './Portal';
import Login from './Login';
import WeixinMask from './WeixinMask';
import Rule from './Rule';
import Transition from './transition';
import connect from './connect';

class Popup extends Base {

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
            </Fragment>
                
        );
    }
}

export default connect( Popup, [ 'popStatus' ] );